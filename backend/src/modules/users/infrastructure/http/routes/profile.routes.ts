import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthentication';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', celebrate({ [Segments.BODY]: {} }), profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      newPassword: Joi.string(),
    },
  }),
  profileController.update,
);

export default profileRouter;
