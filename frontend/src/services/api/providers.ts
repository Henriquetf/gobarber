import api from './api';

interface ProviderMonthAvailabilityParams {
  id: string;
  date: Date;
}

export interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

export async function getProviderMonthAvailability({
  id,
  date,
}: ProviderMonthAvailabilityParams): Promise<MonthAvailabilityItem[]> {
  const monthAvailability = await api.get<MonthAvailabilityItem[]>(
    `/providers/${id}/month-availability`,
    {
      params: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      },
    },
  );

  return monthAvailability.data;
}
