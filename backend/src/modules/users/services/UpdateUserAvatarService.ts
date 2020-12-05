import fs from 'fs';
import path from 'path';

import { inject, injectable } from 'tsyringe';

import { tmpFolder } from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userId, avatarFilename }: IUpdateUserAvatarRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError('Only authenticated users can change their avatars.');
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
