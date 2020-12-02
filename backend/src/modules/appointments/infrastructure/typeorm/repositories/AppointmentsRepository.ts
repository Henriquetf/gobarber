import { getRepository, Repository } from 'typeorm';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
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

  async create(appointmentData: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(appointmentData);

    await this.ormRepository.save(appointment);

    return appointment;
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
}

export default AppointmentsRepository;
