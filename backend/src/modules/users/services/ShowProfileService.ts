import { inject, injectable } from 'tsyringe';

import { BadRequestError } from '@shared/errors/AppError';

import User from '../infrastructure/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new BadRequestError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
