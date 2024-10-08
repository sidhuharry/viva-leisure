import { Request, Response } from 'express';
import { workouts } from '../app';

export const getListTags = (req: Request, resp: Response) => {
  // a set of unique tags. read/write in O(1)
  const tags: Record<string, string> = {};
  workouts?.forEach((aWorkout) => {
    aWorkout.tags.forEach((aTag) => (tags[aTag] = aTag));
  });
  resp.setHeader('Content-Type', 'application/json');
  resp.send({
    tags: Object.keys(tags),
  });
};
