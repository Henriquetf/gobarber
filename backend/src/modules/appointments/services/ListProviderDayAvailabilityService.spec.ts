import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

describe('ListProviderDayAvailability', () => {
  let appointmentsRepository: FakeAppointmentsRepository;
  let listProviderDayAvailability: ListProviderDayAvailabilityService;

  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(appointmentsRepository);
  });

  it('should be able to list the day availability from provider', async () => {
    const providerId = '1';
    const userId = '123';
    const day = 20;
    const month = 12;
    const year = 2020;
    const dateMonth = month - 1;
    const appointmentHours = [8, 10, 14, 15];

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(year, dateMonth, day, 11).getTime();
    });

    const appointmentsMap = appointmentHours.map((hour) => {
      return appointmentsRepository.create({
        date: new Date(year, dateMonth, day, hour, 0, 0),
        userId,
        providerId,
      });
    });

    await appointmentsRepository.create({
      date: new Date(year, dateMonth, 5, 10, 0, 0),
      userId,
      providerId,
    });

    await Promise.all(appointmentsMap);

    const availability = await listProviderDayAvailability.execute({
      providerId,
      year,
      month,
      day,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
