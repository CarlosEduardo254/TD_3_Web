import api from '../shared/api';
import { type LoginDTO } from './auth.types.ts';

const login = async (data: LoginDTO): Promise<{ token: string }> => {
  const response = await api.post('/Auth/login', data);
  return response.data;
};

const AuthService = {
  login,
};

export default AuthService;