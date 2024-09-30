import { Request } from 'express';

export interface IAuthenticator {
  authenticate(req: Request): boolean;
}
