import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment, { AppointmentCreateData } from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

class CreateAppointmentService {
  public async execute({ provider, date }: AppointmentCreateData): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const appointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (appointmentInSameDate) {
      throw new Error('This appointment is already booked.');
    }

    const newAppointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(newAppointment);

    return newAppointment;
  }
}

export default CreateAppointmentService;
