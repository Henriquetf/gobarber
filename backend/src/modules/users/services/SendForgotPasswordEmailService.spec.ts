import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { BadRequestError } from '@shared/errors/AppError';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  let usersRepository: FakeUsersRepository;
  let mailProvider: FakeMailProvider;
  let userTokensRepository: FakeUserTokensRepository;
  let sendForgotPasswordEmail: SendForgotPasswordEmailService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    mailProvider = new FakeMailProvider();
    userTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      usersRepository,
      mailProvider,
      userTokensRepository,
    );
  });

  const email = 'admin@gobarber.com';

  it('should be able to recover the password using the e-mail', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepository.create({
      name: 'Admin',
      password: 'pass',
      email,
    });

    await sendForgotPasswordEmail.execute({
      email,
    });

    expect(sendMail).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'non.existing.mail@fake-domain.com',
      }),
    ).rejects.toThrow(BadRequestError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(userTokensRepository, 'generate');

    const user = await usersRepository.create({
      name: 'Admin',
      password: 'pass',
      email,
    });

    await sendForgotPasswordEmail.execute({
      email,
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
