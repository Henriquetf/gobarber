import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

enum Month {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

interface IRequest {
  providerId: string;
  month: Month;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ day, month, providerId, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      day,
      month,
      providerId,
      year,
    });

    const hourStart = 8;

    const eachHourArray = Array.from({ length: 18 - 8 }, (_, index) => hourStart + index);

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour,
      );

      const appointmentDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(appointmentDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
