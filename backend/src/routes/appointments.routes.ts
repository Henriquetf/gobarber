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
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id: providerId, date } = request.body;

  const parsedDate = parseISO(date);

  const newAppointment = await createAppointment.execute({
    providerId,
    date: parsedDate,
  });

  return response.json(newAppointment);
});

export default appointmentsRouter;
