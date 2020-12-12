import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public index: RequestHandler = async (request, response) => {
    const providerId = request.params.provider_id;
    const { day, month, year } = request.body;

    const listProviderAvailability = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listProviderAvailability.execute({
      day,
      month,
      providerId,
      year,
    });

    return response.json(availability);
  };
}
