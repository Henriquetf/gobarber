import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infrastructure/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IListProvidersRequest {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ userId }: IListProvidersRequest): Promise<User[]> {
    const cacheKey = `providers-list:${userId}`;

    let providers = await this.cacheProvider.recover<User[]>(cacheKey);

    if (!providers) {
      providers = await this.usersRepository.findAllProviders({
        exceptUserId: userId,
      });

      await this.cacheProvider.save(cacheKey, classToClass(providers));
    }

    return classToClass(providers);
  }
}

export default ListProvidersService;
