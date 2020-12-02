import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { BadRequestError } from '@shared/errors/AppError';

import User from '../infrastructure/typeorm/entities/User';
import UsersRepository from '../infrastructure/typeorm/repositories/UsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';

type CreateUserRequest = Pick<User, 'name' | 'email' | 'password'>;

@injectable()
class CreateUserService {
  constructor(
    @inject(UsersRepository.name)
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: CreateUserRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new BadRequestError('Email address is already in use.');
    }

    const hashedPassword = await hash(password, 10);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
