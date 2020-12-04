import { BadRequestError } from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const appointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const providerId = '1';

    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe(providerId);
  });

  it('should not be able to create two appointments on the same date', async () => {
    const appointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointmentDate = new Date(2020, 11, 1, 12);

    await createAppointment.execute({
      providerId: '1',
      date: appointmentDate,
    });

    await expect(
      createAppointment.execute({
        providerId: '2',
        date: appointmentDate,
      }),
    ).rejects.toThrow(BadRequestError);
  });
});
