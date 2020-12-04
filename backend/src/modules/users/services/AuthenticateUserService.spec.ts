import { UnauthorizedError } from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new FakeUsersRepository();
    const hashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);
    const authenticateUser = new AuthenticateUserService(usersRepository, hashProvider);

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
    const usersRepository = new FakeUsersRepository();
    const hashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(usersRepository, hashProvider);

    await expect(
      authenticateUser.execute({
        email: 'admin@gobarber.com',
        password: 'pass',
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should not be able to authenticate with an incorrect password', async () => {
    const usersRepository = new FakeUsersRepository();
    const hashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);
    const authenticateUser = new AuthenticateUserService(usersRepository, hashProvider);

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
