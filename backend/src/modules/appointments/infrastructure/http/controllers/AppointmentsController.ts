import { parseISO } from 'date-fns';
import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository';

class AppointmentsController {
  public index: RequestHandler = async (request, response) => {
    const appointmentsRepository = new AppointmentsRepository();
    const appointments = await appointmentsRepository.findAll();

    return response.json(appointments);
  };

  public create: RequestHandler = async (request, response) => {
    const { provider_id: providerId, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const parsedDate = parseISO(date);

    const newAppointment = await createAppointment.execute({
      providerId,
      date: parsedDate,
    });

    return response.json(newAppointment);
  };
}

export default AppointmentsController;
