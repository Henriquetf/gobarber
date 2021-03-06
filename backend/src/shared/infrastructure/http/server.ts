/* eslint-disable no-console */
import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { uploadsFolder } from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import createConnections from '@shared/infrastructure/typeorm';

import '@shared/container';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadsFolder));

app.use(rateLimiter);
app.use(routes);

app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }

  return response.status(500).json({
    error: 'Internal server error',
  });
});

async function init() {
  try {
    await createConnections();

    app.listen(3333, () => {
      console.log('Server started running on port 3333');
    });
  } catch (error) {
    console.log(error);
  }
}

void init();
