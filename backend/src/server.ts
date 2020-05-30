import 'reflect-metadata';
import express from 'express';

import { tmpFolder } from './config/upload';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(tmpFolder));
app.use(routes);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started running on port 3333');
});
