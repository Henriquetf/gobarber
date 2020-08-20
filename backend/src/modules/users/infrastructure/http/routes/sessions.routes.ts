import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

const authenticateUser = new AuthenticateUserService();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
});

export default sessionsRouter;
