import { Request, Response } from 'express';
import { workouts } from '../app';

//TODO have pagination here
//TODO add error handling
export const getWorkouts = (req: Request, resp: Response) => {
  resp.setHeader('Content-Type', 'application/json');
  if (Object.keys(req.query).length < 1) {
    resp.send(workouts);
  }

  if (req.query['tag']) {
    resp.send(getWorkoutsByTag(req.query['tag'] as string));
  }

  if (req.query['searchName']) {
    resp.send(getWorkoutsBySearchName(req.query['searchName'] as string));
  }

  if (req.query['durationMin'] && req.query['durationMax']) {
    resp.send(
      getWorkoutsByDurationRange(
        Number.parseInt(req.query['durationMin'] as string),
        Number.parseInt(req.query['durationMax'] as string)
      )
    );
  }

  if (req.query['duration']) {
    resp.send(
      getWorkoutsByDuration(Number.parseInt(req.query['duration'] as string))
    );
  }
};

const getWorkoutsByTag = (tag: string) => {
  tag = tag.trim();
  return workouts?.filter(
    (aWorkout) =>
      aWorkout.tags
        .map((aTag) => aTag.toLowerCase())
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

// TODO improve this using binary search
const getWorkoutsByDurationRange = (minD: number, maxD: number) => {
  return workouts?.filter(
    (aWorkout) => aWorkout.durationMins >= minD && aWorkout.durationMins <= maxD
  );
};

const getWorkoutsByDuration = (duration: number) => {
  return workouts?.filter((aWorkout) => aWorkout.durationMins === duration);
};
