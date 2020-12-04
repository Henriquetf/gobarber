import fs from 'fs';
import path from 'path';

import { inject, injectable } from 'tsyringe';

import { tmpFolder } from '@config/upload';
import { UnauthorizedError } from '@shared/errors/AppError';

import User from '../infrastructure/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IUpdateUserAvatarRequest {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, avatarFilename }: IUpdateUserAvatarRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError('Only authenticated users can change their avatars.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(tmpFolder, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
