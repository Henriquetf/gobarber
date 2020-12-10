import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infrastructure/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IListProvidersRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId }: IListProvidersRequest): Promise<User[]> {
    const providers = await this.usersRepository.findAllProviders({
      exceptUserId: userId,
    });

    return providers;
  }
}

export default ListProvidersService;
