import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';

describe('ListProviderAppointments', () => {
  let appointmentsRepository: FakeAppointmentsRepository;
  let cacheProvider: FakeCacheProvider;
  let ListProviderAppointments: ListProviderAppointmentsService;

  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    cacheProvider = new FakeCacheProvider();

    ListProviderAppointments = new ListProviderAppointmentsService(
      appointmentsRepository,
      cacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const providerId = 'provider';
    const userId = 'user';

    const year = 2020;
    const month = 12;
    const dateMonth = month - 1;
    const day = 10;

    const appointment1 = await appointmentsRepository.create({
      date: new Date(year, dateMonth, day, 15, 0, 0),
      userId,
      providerId,
    });

    const appointment2 = await appointmentsRepository.create({
      date: new Date(year, dateMonth, day, 18, 0, 0),
      userId,
      providerId,
    });

    const appointments = await ListProviderAppointments.execute({
      providerId,
      day,
      month,
      year,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
