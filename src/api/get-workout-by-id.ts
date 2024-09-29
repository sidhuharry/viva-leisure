import { Request, Response } from 'express';
import { workouts, workoutsById } from '../app';

export const getWorkoutById = (req: Request, res: Response) => {
  // For the first request, this endpoint may be slightly slow because of initialization
  // But this lazy initialization is better than initializing on server start.
  intializeInMemoryCache();
  workouts?.forEach((aWorkout) => (workoutsById[aWorkout.id] = aWorkout));
  const workoutId = req.params['workoutId'];
  if (!workoutId) {
    res.sendStatus(400).send('Bad request. Need the workoutId');
  }

  const aWorkout = workoutsById[workoutId];

  if (!aWorkout) {
    res.sendStatus(404);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(aWorkout));
  }
};

const intializeInMemoryCache = () => {
  if (Object.entries(workoutsById).length < 1) {
    workouts?.forEach((aWorkout) => (workoutsById[aWorkout.id] = aWorkout));
  }
};
