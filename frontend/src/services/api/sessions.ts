import api from './api';

interface AuthenticateParams {
  email: string;
  password: string;
}

interface AuthenticateData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
  };
}

export async function authenticate(params: AuthenticateParams): Promise<AuthenticateData> {
  const response = await api.post<AuthenticateData>('sessions', params);

  return response.data;
}
