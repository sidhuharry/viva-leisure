import { Request, Response } from 'express';
import { promptOpenAi } from '../services/open-ai-service';

export const getAiDesc = async (req: Request, resp: Response) => {
  req.accepts('application/json');
  const workoutId = req.params['workoutId'];
  if (!workoutId) {
    resp.sendStatus(400).send('Bad request. Need the workoutId');
  }
  const aiResp = await promptOpenAi(workoutId);
  resp.send(aiResp.choices[0].message);
};
