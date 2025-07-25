import api from '../shared/api.ts';
import { type Tarefa, type TarefaDto } from './tarefa.types.ts';

// GET /api/projetos/{projetoId}/tarefas
const listarTarefasPorProjeto = async (projetoId: string): Promise<Tarefa[]> => {
  const response = await api.get(`/projetos/${projetoId}/tarefas`);
  return response.data;
};

// POST /api/projetos/{projetoId}/tarefas
const criarTarefa = async (projetoId: string, data: TarefaDto): Promise<Tarefa> => {
  const response = await api.post(`/projetos/${projetoId}/tarefas`, data);
  return response.data;
};

// PUT /api/projetos/{projetoId}/tarefas/{tarefaId}
const atualizarTarefa = async (projetoId: string, tarefaId: string, data: TarefaDto): Promise<void> => {
  await api.put(`/projetos/${projetoId}/tarefas/${tarefaId}`, data);
};

// DELETE /api/projetos/{projetoId}/tarefas/{tarefaId}
const deletarTarefa = async (projetoId: string, tarefaId: string): Promise<void> => {
  await api.delete(`/projetos/${projetoId}/tarefas/${tarefaId}`);
};
// POST /api/tarefas/{tarefaId}/mover
const moverTarefa = async (tarefaId: string, novoProjetoId: string): Promise<void> => {
  await api.post(`/tarefas/${tarefaId}/mover`, { novoProjetoId });
};


const TarefaService = {
  listarPorProjeto: listarTarefasPorProjeto,
  criar: criarTarefa,
  atualizar: atualizarTarefa,
  deletar: deletarTarefa,
  mover: moverTarefa, 
};

export default TarefaService;