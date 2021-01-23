import { classToClass } from 'class-transformer';
import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public show: RequestHandler = async (request, response) => {
    const userId = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute(userId);

    return response.json(user.asTransformed());
  };

  public update: RequestHandler = async (request, response) => {
    const userId = request.user.id;
    const { name, email, password, newPassword } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      email,
      name,
      userId,
      newPassword,
      password,
    });

    return response.json(user.asTransformed());
  };
}
