import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import { BadRequestError } from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  let appointmentsRepository: FakeAppointmentsRepository;
  let cacheProvider: FakeCacheProvider;
  let notificationsRepository: FakeNotificationsRepository;
  let createAppointment: CreateAppointmentService;

  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository();
    notificationsRepository = new FakeNotificationsRepository();
    cacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      appointmentsRepository,
      notificationsRepository,
      cacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 10, 1).getTime());

    const userId = 'user-id';
    const providerId = 'provider-id';

    const appointment = await createAppointment.execute({
      date: new Date(2020, 11, 1, 12),
      userId,
      providerId,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe(providerId);
  });

  it('should not be able to create two appointments on the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 10, 1).getTime());

    const appointmentDate = new Date(2020, 11, 1, 12);

    const userId = 'user-id';

    await createAppointment.execute({
      providerId: 'provider-id-1',
      userId,
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        providerId: 'provider-id-2',
        userId,
        date: appointmentDate,
      }),
    ).rejects.toThrow(BadRequestError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 12, 10, 12).getTime());

    await expect(
      createAppointment.execute({
        userId: 'user-id',
        providerId: 'provider-id',
        date: new Date(2020, 12, 10, 11),
      }),
    ).rejects.toThrow(BadRequestError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 10, 1).getTime());

    await expect(
      createAppointment.execute({
        userId: 'user-id',
        providerId: 'user-id',
        date: new Date(2020, 12, 10, 11),
      }),
    ).rejects.toThrow(BadRequestError);
  });

  it('should not be able to create an appointment before 08:00 and after 17:00', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 10, 1).getTime());

    await expect(
      createAppointment.execute({
        userId: 'user-id',
        providerId: 'provider-id',
        date: new Date(2020, 10, 2, 7),
      }),
    ).rejects.toThrow(BadRequestError);

    await expect(
      createAppointment.execute({
        userId: 'user-id',
        providerId: 'provider-id',
        date: new Date(2020, 10, 2, 18),
      }),
    ).rejects.toThrow(BadRequestError);
  });
});
