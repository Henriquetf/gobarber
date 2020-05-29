import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated: RequestHandler = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new Error('JWT token is missing.');
  }

  const [, authToken] = authorization.split(' ');

  try {
    const tokenPayload = verify(authToken, authConfig.jwt.secret) as TokenPayload;

    request.user = {
      id: tokenPayload.sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
};

export default ensureAuthenticated;
