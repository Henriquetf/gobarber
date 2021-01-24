import api from './api';

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

interface ResetPasswordParams {
  password: string;
  password_confirmation: string;
  token: string;
}

export async function signUp(params: SignUpParams): Promise<void> {
  await api.post('users', params);
}

export async function forgotPassword(email: string): Promise<void> {
  await api.post('/password/forgot', { email });
}

export async function resetPassword(params: ResetPasswordParams): Promise<void> {
  await api.post('/password/reset', params);
}
