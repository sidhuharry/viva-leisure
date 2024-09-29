import express, { Request, Response } from 'express';
import { Workout } from './types/workouts';
import { Nullable } from './types/nullable';
import { readJson } from './utils/json-utils';
import { getWorkoutById } from './api/get-workout-by-id';
import { getListTags } from './api/get-list-tags';
import { getWorkouts } from './api/get-workouts';

//TODO have hateos implementation
// TODO add some kind of auth
//TODO have a common filter to validate input params

const app = express();

export let workouts: Nullable<Workout[]>;

// In memory cache to have O(1) access to the records by id.
export const workoutsById: Record<string, Workout> = {};

//TODO use dotenv and move this to env
const port = 3000;

app.get('/v1/api/workout/:workoutId', getWorkoutById);

app.get('/v1/api/list-tags', getListTags);

app.get('/v1/api/workouts', getWorkouts);

const startup = () => {
  workouts = readJson();
  if (!workouts) {
    server.close(() => {
      console.log('Unable to load workouts file. Shuting down. Good bye');
      process.exit(1);
    });
  } else {
    // sort the workouts on duration param to be able to do a binarySearch
    workouts?.sort((a, b) => a.durationMins - b.durationMins);
  }

  console.log('🏃‍♀️🏃‍♀️ Server running');
};

const server = app.listen(port, startup);
