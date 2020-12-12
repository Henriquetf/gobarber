import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

describe('ListProviderMonthAvailability', () => {
  let appointmentsRepository: FakeAppointmentsRepository;
  let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      appointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    const providerId = '1';
    const userId = '123';
    const year = 2020;
    const month = 12;
    const dateMonth = month - 1;

    const appointmentsMap = Array.from({ length: 18 - 8 }, (_, index) =>
      appointmentsRepository.create({
        date: new Date(year, dateMonth, 1, 8 + index, 0, 0),
        userId,
        providerId,
      }),
    );

    await appointmentsRepository.create({
      date: new Date(year, dateMonth, 5, 10, 0, 0),
      userId,
      providerId,
    });

    await Promise.all(appointmentsMap);

    const availability = await listProviderMonthAvailability.execute({
      providerId,
      year,
      month,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 1, available: false },
        { day: 2, available: true },
        { day: 3, available: true },
        { day: 4, available: true },
        { day: 5, available: true },
        { day: 6, available: true },
      ]),
    );
  });
});
