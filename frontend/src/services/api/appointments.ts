import api from './api';

export interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

export interface UserAppointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatarUrl: string;
  };
}

export async function getProviderAppointments(date: Date): Promise<UserAppointment[]> {
  const response = await api.get<UserAppointment[]>(`/appointments/me`, {
    params: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    },
  });

  return response.data;
}
