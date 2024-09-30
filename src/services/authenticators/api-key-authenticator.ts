import { Request } from 'express';
import { IAuthenticator } from '../../types/authenticators';
import { singleton } from '../../types/singleton';

class ApiKeyAuthenticatorService implements IAuthenticator {
  authenticate(req: Request): boolean {
    return req.headers['x-api-key'] === process.env.API_KEY;
  }
}

export const apiKeyAuthenticator = singleton(ApiKeyAuthenticatorService);
