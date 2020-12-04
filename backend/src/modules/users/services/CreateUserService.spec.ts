import { BadRequestError } from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const usersRepository = new FakeUsersRepository();
    const hashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    const user = await createUser.execute({
      name: 'Admin',
      email: 'admin@gobarber.com',
      password: 'pass',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same e-mail', async () => {
    const usersRepository = new FakeUsersRepository();
    const hashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    await createUser.execute({
      name: 'Admin',
      email: 'admin@gobarber.com',
      password: 'pass',
    });

    await expect(
      createUser.execute({
        name: 'User',
        email: 'admin@gobarber.com',
        password: 'pass',
      }),
    ).rejects.toThrow(BadRequestError);
  });
});
