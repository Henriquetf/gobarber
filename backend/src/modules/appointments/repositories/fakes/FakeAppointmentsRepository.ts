/* eslint-disable @typescript-eslint/require-await */
import { isEqual } from 'date-fns';
import { v4 as uuid } from 'uuid';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../../infrastructure/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAll(): Promise<Appointment[]> {
    return this.appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    return this.appointments.find((appointment) => isEqual(appointment.date, date)) || null;
  }

  public async create({ date, providerId }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    appointment.id = uuid();
    appointment.date = date;
    appointment.providerId = providerId;

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
