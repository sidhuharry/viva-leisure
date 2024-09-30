import { apiKeyAuthenticator } from '../services/authenticators/api-key-authenticator';

export const BUCKET_SIZE = 5;

export const singletons = {
  apiKeyAuthenticator: apiKeyAuthenticator.getInstance(),
};
