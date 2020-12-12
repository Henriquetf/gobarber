import { getRepository, Raw, Repository } from 'typeorm';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAll(): Promise<Appointment[]> {
    return this.ormRepository.find();
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    const existingAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    if (existingAppointment === undefined) {
      return null;
    }

    return existingAppointment;
  }

  public async findAllInMonthFromProvider({
    month,
    providerId,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw((dateFieldName) => `to_char(${dateFieldName}, 'MM-YYYY') = :dateAndYear`, {
          dateAndYear: `${parsedMonth}-${year}`,
        }),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    day,
    month,
    providerId,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        providerId,
        date: Raw((dateFieldName) => `to_char(${dateFieldName}, 'DD-MM-YYYY') = :dateAndYear`, {
          dateAndYear: `${parsedDay}-${parsedMonth}-${year}`,
        }),
      },
    });

    return appointments;
  }

  async create(appointmentData: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(appointmentData);

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
