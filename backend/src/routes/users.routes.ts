import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthentication';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

const createUser = new CreateUserService();
const updateUserAvatar = new UpdateUserAvatarService();

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const user = await updateUserAvatar.execute({
        avatarFilename: request.file.filename,
        userId: request.user.id,
      });

      delete user.password;

      return response.json({
        user,
      });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const user = await createUser.execute({
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
