import { Repository, EntityRepository } from 'typeorm';

import Appointment from '../infrastructure/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const existingAppointment = await this.findOne({
      where: { date },
    });

    if (existingAppointment === undefined) {
      return null;
    }

    return existingAppointment;
  }
}

export default AppointmentsRepository;
