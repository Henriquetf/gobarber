import { parseISO } from 'date-fns';
import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
  public index: RequestHandler = async (request, response) => {
    const providerId = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = listProviderAppointments.execute({
      day,
      month,
      providerId,
      year,
    });

    return response.json(appointments);
  };
}

export default ProviderAppointmentsController;
