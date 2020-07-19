import api from './api';

interface AuthenticateParams {
  email: string;
  password: string;
}

export function authenticate(params: AuthenticateParams) {
  return api.post('sessions', params);
}
