/* eslint-disable @typescript-eslint/require-await */
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import { v4 as uuid } from 'uuid';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
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

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.providerId === providerId &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.providerId === providerId &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async create({ date, providerId, userId }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign<Appointment, Partial<Appointment>>(appointment, {
      id: uuid(),
      date,
      providerId,
      userId,
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
