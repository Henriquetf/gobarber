import { container } from 'tsyringe';

import AppointmentsRepository from '@modules/appointments/infrastructure/typeorm/repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import UsersRepository from '@modules/users/infrastructure/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  AppointmentsRepository.name,
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(UsersRepository.name, UsersRepository);
