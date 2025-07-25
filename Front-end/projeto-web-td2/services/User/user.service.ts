import api from '../shared/api';
import { type CadastroUsuarioDTO, type PerfilUsuarioDTO } from './user.types.ts';

// Função para registrar um novo usuário
// Ela envia os dados para o endpoint "api/Users/registrar"
const register = async (data: CadastroUsuarioDTO): Promise<PerfilUsuarioDTO> => {
  const response = await api.post('/Users/registrar', data);
  return response.data;
};

const UserService = {
  register,
};

export default UserService;