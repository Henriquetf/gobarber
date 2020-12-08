import { BadRequestError } from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

describe('ShowProfile', () => {
  let usersRepository: FakeUsersRepository;
  let showProfile: ShowProfileService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(usersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await usersRepository.create({
      name: 'Dog User',
      email: 'dog.user@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute(user.id);

    expect(profile.name).toBe('Dog User');
    expect(profile.email).toBe('dog.user@example.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(showProfile.execute('non-existing-id')).rejects.toThrow(BadRequestError);
  });
});
