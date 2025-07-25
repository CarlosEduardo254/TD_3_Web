import api from '../shared/api.ts';
import { type Projeto, type ProjetoCriacaoDto, type ProjetoAtualizacaoDto } from './projeto.types.ts';

// GET /api/Projeto/Projetos
const listarProjetos = async (): Promise<Projeto[]> => {
  const response = await api.get('/Projeto/Projetos');
  return response.data;
};

// POST /api/Projeto/criarProjeto
const criarProjeto = async (data: ProjetoCriacaoDto): Promise<Projeto> => {
  const response = await api.post('/Projeto/criarProjeto', data);
  return response.data;
};

// PUT /api/Projeto/{id}
const atualizarProjeto = async (id: string, data: ProjetoAtualizacaoDto): Promise<void> => {
  await api.put(`/Projeto/${id}`, data);
};

// DELETE /api/Projeto/{id}
const deletarProjeto = async (id: string): Promise<void> => {
  await api.delete(`/Projeto/${id}`);
};

const ProjetoService = {
  listar: listarProjetos,
  criar: criarProjeto,
  atualizar: atualizarProjeto,
  deletar: deletarProjeto,
};

export default ProjetoService;