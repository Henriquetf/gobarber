import { v4 as uuid } from 'uuid';

import UserToken from '@modules/users/infrastructure/typeorm/entities/UserToken';

import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as UserToken);

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = this.userTokens.find((findToken) => findToken.token === token);

    return userToken || null;
  }
}

export default FakeUserTokensRepository;
