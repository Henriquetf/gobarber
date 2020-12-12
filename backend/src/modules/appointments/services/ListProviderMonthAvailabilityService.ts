import { getDate, getDaysInMonth } from 'date-fns';
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
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ providerId, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      providerId,
      month,
      year,
    });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
    const eachDayArray = Array.from(
      {
        length: numberOfDaysInMonth,
      },
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map((day) => {
      const appointmentsInDay = appointments.filter(
        (appointment) => getDate(appointment.date) === day,
      );

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
