import { RequestHandler } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import { TooManyRequestsError } from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD || undefined,
});

const rateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 10,
  duration: 1,
});

const rateLimiter: RequestHandler = async (request, response, next) => {
  try {
    await rateLimiterRedis.consume(request.ip);

    return next();
  } catch (err) {
    throw new TooManyRequestsError('Too many requests');
  }
};

export default rateLimiter;
