import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public update: RequestHandler = async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      avatarFilename: request.file.filename,
      userId: request.user.id,
    });

    delete user.password;

    return response.json({
      user,
    });
  };
}
