import crypto from 'crypto';
import path from 'path';

import multer, { Options } from 'multer';

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const uploadConfig: Options = {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}`;

      return callback(null, fileName);
    },
  }),
};

export default uploadConfig;
