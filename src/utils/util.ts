import { workouts, workoutsById } from '../app';
import { BUCKET_SIZE } from '../types/constants';

export const getWorkoutsByDurationBucketIndex = (duration: number) => {
  return Math.floor(duration / BUCKET_SIZE) * BUCKET_SIZE;
};

export const intializeInMemoryIdxForWorkoutById = () => {
  if (Object.entries(workoutsById).length < 1) {
    workouts?.forEach((aWorkout) => (workoutsById[aWorkout.id] = aWorkout));
  }
};
