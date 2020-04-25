import { startOfHour } from 'date-fns';

import Appointment, { AppointmentCreateData } from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: AppointmentCreateData): Appointment {
    const appointmentDate = startOfHour(date);

    const appointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentInSameDate) {
      throw new Error('This appointment is already booked.');
    }

    const newAppointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return newAppointment;
  }
}

export default CreateAppointmentService;
