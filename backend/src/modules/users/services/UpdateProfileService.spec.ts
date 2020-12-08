import { BadRequestError, UnauthorizedError } from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

describe('UpdateProfile', () => {
  let usersRepository: FakeUsersRepository;
  let hashProvider: FakeHashProvider;
  let updateProfile: UpdateProfileService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(usersRepository, hashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await usersRepository.create({
      name: 'Dog User',
      email: 'dog.user@example.com',
      password: '123456',
    });

    const newEmail = 'cat.user@example.com';
    const newName = 'Cat User';

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      email: newEmail,
      name: newName,
      password: '123456',
    });

    expect(updatedUser.email).toBe(newEmail);
    expect(updatedUser.name).toBe(newName);
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        userId: 'non-existing-id',
        name: '',
        email: '',
      }),
    ).rejects.toThrow(BadRequestError);
  });

  it('should not be able to change the e-mail to an already existing e-mail', async () => {
    const existingName = 'Cat User';
    const existingEmail = 'cat.user@example.com';

    await usersRepository.create({
      name: existingName,
      email: existingEmail,
      password: '123456',
    });

    const user = await usersRepository.create({
      name: 'Dog User',
      email: 'dog.user@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: existingName,
        email: existingEmail,
      }),
    ).rejects.toThrow(BadRequestError);
  });

  it('should be able to update the password', async () => {
    const user = await usersRepository.create({
      name: 'Dog User',
      email: 'dog.user@example.com',
      password: '123456',
    });

    const newEmail = 'cat.user@example.com';
    const newName = 'Cat User';
    const newPassword = '0123456';

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      email: newEmail,
      name: newName,
      password: '123456',
      newPassword,
    });

    expect(updatedUser.password).toBe(newPassword);
  });

  it('should not be able to update the password without providing the old password', async () => {
    const user = await usersRepository.create({
      name: 'Dog User',
      email: 'dog.user@example.com',
      password: '123456',
    });

    const newEmail = 'cat.user@example.com';
    const newName = 'Cat User';
    const newPassword = '0123456';

    await expect(
      updateProfile.execute({
        userId: user.id,
        email: newEmail,
        name: newName,
        newPassword,
      }),
    ).rejects.toThrow(UnauthorizedError);

    await expect(
      updateProfile.execute({
        userId: user.id,
        email: newEmail,
        name: newName,
        password: 'incorrect-password',
        newPassword,
      }),
    ).rejects.toThrow(UnauthorizedError);
  });
});
