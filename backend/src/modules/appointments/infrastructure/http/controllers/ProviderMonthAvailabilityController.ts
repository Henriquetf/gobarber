import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public index: RequestHandler = async (request, response) => {
    const providerId = request.params.provider_id;
    const { month, year } = request.body;

    const listProviderAvailability = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviderAvailability.execute({
      month,
      providerId,
      year,
    });

    return response.json(availability);
  };
}
