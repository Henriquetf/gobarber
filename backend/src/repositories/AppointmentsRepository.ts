import { isEqual } from 'date-fns';

import Appointment, { AppointmentCreateData } from '../models/Appointment';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findAll(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const existingAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date),
    );

    if (existingAppointment === undefined) {
      return null;
    }

    return existingAppointment;
  }

  public create(appointmentCreateData: AppointmentCreateData): Appointment {
    const appointment = new Appointment(appointmentCreateData);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
