import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import { UnauthorizedError } from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  let usersRepository: FakeUsersRepository;
  let storageProvider: FakeStorageProvider;
  let updateUserAvatar: UpdateUserAvatarService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    storageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(usersRepository, storageProvider);
  });

  it('should be able to update user avatar', async () => {
    const user = await usersRepository.create({
      email: 'admin@gobarber.com',
      name: 'Admin',
      password: 'pass',
    });

    const avatarFilename = 'avatar.jpg';

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename,
    });

    expect(user.avatar).toBe(avatarFilename);
  });

  it('should not be able to change avatar when not authenticated', async () => {
    await expect(
      updateUserAvatar.execute({
        userId: 'non-existing-user',
        avatarFilename: 'new-avatar.jpg',
      }),
    ).rejects.toThrow(UnauthorizedError);
  });

  it('should delete the old avatar when a new one is created', async () => {
    const deleteFile = jest.spyOn(storageProvider, 'deleteFile');

    const user = await usersRepository.create({
      email: 'admin@gobarber.com',
      name: 'Admin',
      password: 'pass',
    });

    const oldAvatarFilename = 'avatar.jpg';
    const newAvatarFilename = 'avatar.jpg';

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: oldAvatarFilename,
    });

    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: newAvatarFilename,
    });

    expect(deleteFile).toHaveBeenCalledWith(oldAvatarFilename);
  });
});
