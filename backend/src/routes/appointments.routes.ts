import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const createAppointmentService = new CreateAppointmentService();

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
  const { provider, date } = request.body;

  try {
    const parsedDate = parseISO(date);

    const newAppointment = await createAppointmentService.execute({
      provider,
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
