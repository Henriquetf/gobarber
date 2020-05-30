import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import { BadRequestError } from '../errors/AppError';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

type CreateAppointmentRequest = Pick<Appointment, 'providerId' | 'date'>;

class CreateAppointmentService {
  public async execute({ providerId, date }: CreateAppointmentRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const appointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (appointmentInSameDate) {
      throw new BadRequestError('This appointment is already booked.');
    }

    const newAppointment = appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    await appointmentsRepository.save(newAppointment);

    return newAppointment;
  }
}

export default CreateAppointmentService;
