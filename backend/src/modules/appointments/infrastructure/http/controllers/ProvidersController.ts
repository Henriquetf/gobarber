import { classToClass } from 'class-transformer';
import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public index: RequestHandler = async (request, response) => {
    const userId = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      userId,
    });

    return response.json(classToClass(providers));
  };
}
