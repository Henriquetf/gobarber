import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { BadRequestError } from '@shared/errors/AppError';

import Appointment from '../infrastructure/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface ICreateAppointmentRequest {
  providerId: string;
  userId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    providerId,
    userId,
    date,
  }: ICreateAppointmentRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (userId === providerId) {
      throw new BadRequestError("You can't create an appointment with yourself.");
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new BadRequestError("You can't create an appointment on a past date.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new BadRequestError('You can only create appointments between 8 AM and 5 PM');
    }

    const appointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (appointmentInSameDate) {
      throw new BadRequestError('This appointment is already booked.');
    }

    const newAppointment = await this.appointmentsRepository.create({
      providerId,
      userId,
      date: appointmentDate,
    });

    const cacheKey = `provider-appointments:${providerId}:${format(appointmentDate, 'yyyy-M-d')}`;
    await this.cacheProvider.invalidate(cacheKey);

    const formattedDate = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `Novo agendamento para dia ${formattedDate}`,
    });

    return newAppointment;
  }
}

export default CreateAppointmentService;
