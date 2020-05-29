import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthentication';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

const createAppointment = new CreateAppointmentService();

appointmentsRouter.get('/', async (request, response) => {
  try {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id: providerId, date } = request.body;

  try {
    const parsedDate = parseISO(date);

    const newAppointment = await createAppointment.execute({
      providerId,
      date: parsedDate,
    });

    return response.json(newAppointment);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default appointmentsRouter;
