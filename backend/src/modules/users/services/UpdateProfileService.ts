import { inject, injectable } from 'tsyringe';

import { BadRequestError, UnauthorizedError } from '@shared/errors/AppError';

import User from '../infrastructure/typeorm/entities/User';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface IUpdateProfileRequest {
  userId: string;
  name: string;
  email: string;
  password?: string;
  newPassword?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    userId,
    newPassword,
    password,
  }: IUpdateProfileRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new BadRequestError('User not found');
    }

    const userByEmail = await this.usersRepository.findByEmail(email);

    if (userByEmail && userByEmail.id !== userId) {
      throw new BadRequestError('E-mail already in use.');
    }

    user.name = name;
    user.email = email;

    if (!password) {
      throw new UnauthorizedError('Password not provided.');
    }

    const isPasswordValid = await this.hashProvider.compareHash(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('The provided password is incorrect.');
    }

    if (newPassword) {
      user.password = await this.hashProvider.generateHash(newPassword);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
