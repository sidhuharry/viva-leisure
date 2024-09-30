import express from 'express';
import { Workout } from './types/workouts';
import { Nullable } from './types/nullable';
import { readJson } from './utils/json-utils';
import { getWorkoutById } from './api/get-workout-by-id';
import { getListTags } from './api/get-list-tags';
import { getWorkouts } from './api/get-workouts';

import { getAiDesc } from './api/get-ai-desc';
import { authenticationMiddleware } from './services/auth-service';
import { config } from 'dotenv';
import {
  getWorkoutsByDurationBucketIndex,
  intializeInMemoryIdxForWorkoutById,
} from './utils/util';

const app = express();

//dotenv config
config();

app.use(express.json());

// You can plug more authenticators here
// Even make a chain of authenticators!
app.use(authenticationMiddleware);

export let workouts: Nullable<Workout[]>;

// ------ Indexes ----------
// In memory cache to have O(1) access to the records by id.
export const workoutsById: Record<string, Workout> = {};

// Buckets based on duration range. This will enable the access of the records in near O(1)
export const workoutsBucketsByDuration: Record<number, Workout[]> = {};

// -------------------------

const port = process.env.PORT;

app.get('/v1/api/workout/:workoutId', getWorkoutById);

app.get('/v1/api/list-tags', getListTags);

app.get('/v1/api/workouts', getWorkouts);

app.get('/v1/api/workout/:workoutId/ai/desc', getAiDesc);

const startup = () => {
  workouts = readJson();
  if (!workouts) {
    server.close(() => {
      console.log('Unable to load workouts file. Shuting down. Good bye');
      process.exit(1);
    });
  } else {
    intializeInMemoryIdxForWorkoutById();
    // sort the workouts on duration to enable a binary search on it.
    // index the workouts in an interval range to make search easier
    workouts
      ?.sort((a, b) => a.durationMins - b.durationMins)
      .forEach((aWorkout) => {
        // partition the workout into buckets by duration: 0 5 10 15 20 25 30 ...
        const index = getWorkoutsByDurationBucketIndex(aWorkout.durationMins);
        if (!workoutsBucketsByDuration[index]) {
          workoutsBucketsByDuration[index] = [];
        }
        workoutsBucketsByDuration[index].push(aWorkout);
      });
  }

  console.log('🏃‍♀️🏃‍♀️ Server running');
};

const server = app.listen(port, startup);
