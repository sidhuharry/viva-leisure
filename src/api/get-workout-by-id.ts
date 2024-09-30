import { Request, Response } from 'express';
import { workouts, workoutsById } from '../app';

export const getWorkoutById = (req: Request, res: Response) => {
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
