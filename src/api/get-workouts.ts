import { Request, Response } from 'express';
import { workouts, workoutsBucketsByDuration } from '../app';
import { getWorkoutsByDurationBucketIndex } from '../utils/util';
import { BUCKET_SIZE } from '../types/constants';

// TODO have pagination here
// assumption: from the requirements it looked that all query params won't be sent together
// However, if they are to be: we just need to have an array and push workouts based on outputs
// by different functions
export const getWorkouts = (req: Request, resp: Response) => {
  resp.setHeader('Content-Type', 'application/json');
  if (Object.keys(req.query).length < 1) {
    resp.send(workouts);
  }
  try {
    const tag = req.query['tag'] as string;
    if (tag) {
      resp.send(getWorkoutsByTag(tag));
    }

    const searchName = req.query['searchName'] as string;
    if (searchName) {
      resp.send(getWorkoutsBySearchName(searchName));
    }

    const durationMin = Number.parseInt(req.query['durationMin'] as string);
    const durationMax = Number.parseInt(req.query['durationMax'] as string);
    if (durationMin && durationMax) {
      resp.send(getWorkoutsByDurationRange(durationMin, durationMax));
    }

    const duration = Number.parseInt(req.query['duration'] as string);
    if (duration) {
      resp.send(getWorkoutsByDuration(duration));
    }
  } catch (e) {
    console.error('Unable to process request', e);
    resp.sendStatus(500);
  }
};

const getWorkoutsByTag = (tag: string) => {
  tag = tag.trim();
  return workouts?.filter(
    (aWorkout) =>
      aWorkout.tags
        .map((aTag) => aTag.toLowerCase())
        // using indexOf because v8 uses Boyer Moore algorithm which is pretty quick.
        .indexOf(tag.toLowerCase()) !== -1
  );
};

const getWorkoutsBySearchName = (searchName: string) => {
  searchName = searchName.trim();
  return workouts?.filter(
    (aWorkout) =>
      aWorkout.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1
  );
};

const getWorkoutsByDurationRange = (minD: number, maxD: number) => {
  const startIdx = getWorkoutsByDurationBucketIndex(minD);
  const endIdx = getWorkoutsByDurationBucketIndex(maxD);
  const resp = [];
  // For the start and end buckets in the range, we may need partial results.

  // First bucket
  resp.push(
    workoutsBucketsByDuration[startIdx]?.filter(
      (aWorkout) =>
        aWorkout.durationMins >= minD && aWorkout.durationMins <= maxD
    )
  );

  // For the buckets inbetween, we use them as it is.
  for (let idx = startIdx + BUCKET_SIZE; idx < endIdx; idx += BUCKET_SIZE) {
    resp.push(workoutsBucketsByDuration[idx]);
  }

  // last bucket
  resp.push(
    workoutsBucketsByDuration[endIdx]?.filter(
      (aWorkout) =>
        aWorkout.durationMins >= minD && aWorkout.durationMins <= maxD
    )
  );

  return resp;
};

const getWorkoutsByDuration = (duration: number) => {
  const index = getWorkoutsByDurationBucketIndex(duration);
  // locate the bucket in O(1) complexity and filter through BUCKET_SIZE array. Pretty fast.
  return workoutsBucketsByDuration[index]?.filter(
    (aWorkout) => aWorkout.durationMins === duration
  );
};
