import { container } from 'tsyringe';

import MailTrapMailProvider from './implementations/MailTrapMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  mailTrap: MailTrapMailProvider,
};

container.registerSingleton<IMailProvider>('MailProvider', providers.mailTrap);
