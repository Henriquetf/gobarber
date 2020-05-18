import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
const createUserService = new CreateUserService();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
