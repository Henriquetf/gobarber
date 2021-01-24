import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public index: RequestHandler = async (request, response) => {
    const providerId = request.params.provider_id;
    const { day, month, year } = request.query;

    const listProviderAvailability = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listProviderAvailability.execute({
      providerId,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  };
}
