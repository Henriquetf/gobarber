import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import { BadRequestError } from '@shared/errors/AppError';

import Appointment from '../infrastructure/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface ICreateAppointmentRequest {
  providerId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ providerId, date }: ICreateAppointmentRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (appointmentInSameDate) {
      throw new BadRequestError('This appointment is already booked.');
    }

    const newAppointment = await this.appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    return newAppointment;
  }
}

export default CreateAppointmentService;
