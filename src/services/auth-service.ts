import { NextFunction, Request, Response } from 'express';
import { singletons } from '../types/constants';

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestResource = req.path
      .slice(req.path.lastIndexOf('/') + 1, req.path.length)
      .trim();
    console.log(`request resource = ${requestResource}`);
    if (['workout', 'list-tags', 'prompt'].indexOf(requestResource) !== -1) {
      if (!singletons.apiKeyAuthenticator.authenticate(req)) {
        console.log('Unauthorized request.');
        res.sendStatus(401);
      }
      next();
    } else {
      console.log('Authenticated... proceeding');
      next();
    }
  } catch (e) {
    console.log('Error occured while authenticating, sending 401', e);
    res.sendStatus(401);
  }
};
