import { BadRequestError } from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';

describe('ResetPassword', () => {
  let usersRepository: FakeUsersRepository;
  let userTokensRepository: FakeUserTokensRepository;
  let hashProvider: FakeHashProvider;

  let resetPassword: ResetPasswordService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    userTokensRepository = new FakeUserTokensRepository();
    hashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(usersRepository, userTokensRepository, hashProvider);
  });

  it('should be able to reset the password', async () => {
    const oldPassword = '12345678';
    const newPassword = '1234567890';

    const generateHash = jest.spyOn(hashProvider, 'generateHash');

    const user = await usersRepository.create({
      email: 'user@gobarber.com',
      name: 'User',
      password: oldPassword,
    });

    const { token } = await userTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: newPassword,
      token,
    });

    const updatedUser = await usersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith(newPassword);
    expect(updatedUser?.password).toBe(newPassword);

    // const userToken = await userTokensRepository.findByToken(token);

    // expect(userToken).toBeNull();
  });

  it('should not be able to reset the password with incorrect token', async () => {
    await expect(
      resetPassword.execute({
        password: '1234567',
        token: 'non-existing-token',
      }),
    ).rejects.toThrow(BadRequestError);
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        password: '1234567',
        token: '00000000-0000-0000-0000-000000000000',
      }),
    ).rejects.toThrow(BadRequestError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await userTokensRepository.generate('non-existing-user');

    await expect(
      resetPassword.execute({
        password: '1234567',
        token,
      }),
    ).rejects.toThrow(BadRequestError);

    // const userToken = await userTokensRepository.findByToken(token);

    // expect(userToken).toBeNull();
  });

  it('should not be able to reset password after over 2 hours', async () => {
    const user = await usersRepository.create({
      email: 'user@gobarber.com',
      name: 'User',
      password: '12345',
    });

    const { token } = await userTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '12345',
        token,
      }),
    ).rejects.toThrow(BadRequestError);

    // const userToken = await userTokensRepository.findByToken(token);

    // expect(userToken).toBeNull();
  });
});
