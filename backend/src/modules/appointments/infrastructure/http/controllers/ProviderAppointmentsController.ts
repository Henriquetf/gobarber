import { classToClass } from 'class-transformer';
import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
  public index: RequestHandler = async (request, response) => {
    const providerId = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProviderAppointments.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  };
}

export default ProviderAppointmentsController;
