import path from 'path';

import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { BadRequestError } from '@shared/errors/AppError';

import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface ISendForgotPasswordEmailRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: ISendForgotPasswordEmailRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError('User does not exist.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    const baseUrl = process.env.APP_WEB_URL || '';

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        template: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${baseUrl}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
