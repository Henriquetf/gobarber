import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

describe('ListProviders', () => {
  let usersRepository: FakeUsersRepository;
  let listProviders: ListProvidersService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(usersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await usersRepository.create({
      name: 'Cat Person',
      email: 'cat@person.com',
      password: '12345678',
    });

    const user2 = await usersRepository.create({
      name: 'Dog Person',
      email: 'dog@person.com',
      password: '12345678',
    });

    const loggedInUser = await usersRepository.create({
      name: 'Animal Services',
      email: 'business@animal.services.com',
      password: '12345678',
    });

    const providers = await listProviders.execute({
      userId: loggedInUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
