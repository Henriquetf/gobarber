import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import authConfig from '../config/auth';
import { UnauthorizedError } from '../errors/AppError';
import User from '../models/User';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

type PartialUser = Pick<User, 'id' | 'name' | 'email' | 'password'>;

interface AuthenticateUserResponse {
  user: PartialUser;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const usersRepository = getRepository(User);

    const user: PartialUser | undefined = await usersRepository.findOne({
      select: ['id', 'name', 'email', 'password'],
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    const { expiresIn, secret } = authConfig.jwt;
    const tokenPayload = {};

    const token = sign(tokenPayload, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
