import fs from 'fs';
import path from 'path';

import { getRepository } from 'typeorm';

import { tmpFolder } from '../config/upload';
import User from '../models/User';

interface UpdateUserAvatarRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: UpdateUserAvatarRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new Error('Only authenticated users can change their avatars.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(tmpFolder, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
