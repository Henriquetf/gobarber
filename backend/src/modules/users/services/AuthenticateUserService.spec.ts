import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import { UnauthorizedError } from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  let usersRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let createUser: CreateUserService;
  let cacheProvider: FakeCacheProvider;
  let authenticateUser: AuthenticateUserService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    cacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(usersRepository, hashProvider, cacheProvider);
    authenticateUser = new AuthenticateUserService(usersRepository, hashProvider);
  });

  it('should be able to authenticate', async () => {
    await createUser.execute({
      name: 'Admin',
      email: 'admin@gobarber.com',
      password: 'pass',
    });

    const response = await authenticateUser.execute({
      email: 'admin@gobarber.com',
      password: 'pass',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with a non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'admin@gobarber.com',
        password: 'pass',
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should not be able to authenticate with an incorrect password', async () => {
    await createUser.execute({
      name: 'Admin',
      email: 'admin@gobarber.com',
      password: 'pass',
    });

    await expect(
      authenticateUser.execute({
        email: 'admin@gobarber.com',
        password: 'wrong pass',
      }),
    ).rejects.toThrow(UnauthorizedError);
  });
});
