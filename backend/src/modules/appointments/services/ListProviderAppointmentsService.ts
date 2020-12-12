import { inject } from 'tsyringe';

import Appointment from '../infrastructure/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IListProviderAppointmentsRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    day,
    month,
    providerId,
    year,
  }: IListProviderAppointmentsRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      day,
      month,
      providerId,
      year,
    });

    return appointments;
  }
}

export default ListProviderAppointmentsService;
