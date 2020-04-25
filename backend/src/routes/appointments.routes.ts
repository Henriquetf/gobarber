import { parseISO } from 'date-fns';
import { Router } from 'express';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();
const createAppointmentService = new CreateAppointmentService(
  appointmentsRepository,
);

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.findAll();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  try {
    const parsedDate = parseISO(date);

    const newAppointment = createAppointmentService.execute({
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
