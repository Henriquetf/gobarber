import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthentication';

const usersRouter = Router();
const upload = multer(uploadConfig);

const createUser = new CreateUserService();
const updateUserAvatar = new UpdateUserAvatarService();

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const user = await updateUserAvatar.execute({
      avatarFilename: request.file.filename,
      userId: request.user.id,
    });

    delete user.password;

    return response.json({
      user,
    });
  },
);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
