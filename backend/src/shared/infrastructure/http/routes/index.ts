import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infrastructure/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infrastructure/http/routes/providers.routes';
import passwordRouter from '@modules/users/infrastructure/http/routes/password.routes';
import profileRouter from '@modules/users/infrastructure/http/routes/profile.routes';
import sessionsRouter from '@modules/users/infrastructure/http/routes/sessions.routes';
import usersRouter from '@modules/users/infrastructure/http/routes/users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/providers', providersRouter);

export default routes;
