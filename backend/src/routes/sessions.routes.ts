import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

const authenticateUser = new AuthenticateUserService();

sessionsRouter.post('/', async (request, response) => {
  try {
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
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export default sessionsRouter;
