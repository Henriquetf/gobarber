import 'reflect-metadata';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { tmpFolder } from './config/upload';
import { AppError } from './errors/AppError';
import routes from './routes';

import './database';

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
    // eslint-disable-next-line no-console
    console.log(err);
  }

  return response.status(500).json({
    error: 'Internal server error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started running on port 3333');
});
