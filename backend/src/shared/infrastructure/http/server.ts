/* eslint-disable no-console */
import 'reflect-metadata';
import 'express-async-errors';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { tmpFolder } from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infrastructure/typeorm';

import '@shared/container';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(tmpFolder));
app.use(routes);

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

function init() {
  createConnection()
    .then(() => {
      app.listen(3333, () => {
        console.log('Server started running on port 3333');
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

init();
