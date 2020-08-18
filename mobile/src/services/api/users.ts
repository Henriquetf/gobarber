import api from './api';

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export function signUp(params: SignUpParams) {
  return api.post('users', params);
}
