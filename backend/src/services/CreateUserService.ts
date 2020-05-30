import { hash } from 'bcrypt';
import { getRepository } from 'typeorm';

import { BadRequestError } from '../errors/AppError';
import User from '../models/User';

type CreateUserRequest = Pick<User, 'name' | 'email' | 'password'>;

class CreateUserService {
  public async execute({ name, email, password }: CreateUserRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new BadRequestError('Email address is already in use.');
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
