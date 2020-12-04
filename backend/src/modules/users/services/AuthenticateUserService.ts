import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';
import { UnauthorizedError } from '@shared/errors/AppError';

import User from '../infrastructure/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

interface IAuthenticateUserResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IAuthenticateUserRequest): Promise<IAuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

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
