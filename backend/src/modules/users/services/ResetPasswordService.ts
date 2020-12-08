import { differenceInHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { BadRequestError } from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IResetPasswordRequest {
  password: string;
  token: string;
}

const TOKEN_EXPIRATION_HOURS = 2;

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IResetPasswordRequest): Promise<void> {
    if (!validate(token)) {
      throw new BadRequestError('User token does not exist.');
    }

    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new BadRequestError('User token does not exist.');
    }

    const user = await this.usersRepository.findById(userToken.userId);

    if (!user) {
      throw new BadRequestError('User token does not exist.');
    }

    if (differenceInHours(Date.now(), userToken.createdAt) > TOKEN_EXPIRATION_HOURS) {
      throw new BadRequestError('Token expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
