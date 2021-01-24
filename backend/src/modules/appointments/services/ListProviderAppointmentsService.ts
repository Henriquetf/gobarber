import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Appointment from '../infrastructure/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IListProviderAppointmentsRequest {
  providerId: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    day,
    month,
    providerId,
    year,
  }: IListProviderAppointmentsRequest): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${providerId}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        day,
        month,
        providerId,
        year,
      });

      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }

    return classToClass(appointments);
  }
}

export default ListProviderAppointmentsService;
