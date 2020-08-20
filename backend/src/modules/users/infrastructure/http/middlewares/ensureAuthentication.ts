import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import { UnauthorizedError } from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated: RequestHandler = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new UnauthorizedError('Access token is missing.');
  }

  const [, authToken] = authorization.split(' ');

  try {
    const tokenPayload = verify(authToken, authConfig.jwt.secret) as TokenPayload;

    request.user = {
      id: tokenPayload.sub,
    };

    return next();
  } catch {
    throw new UnauthorizedError('Invalid access token.');
  }
};

export default ensureAuthenticated;
