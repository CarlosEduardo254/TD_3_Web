import api from '../shared/api.ts';
import { type Etiqueta, type EtiquetaCriacaoDto, type EtiquetaAtualizacaoDto } from './etiqueta.types.ts';

const listarEtiquetas = async (): Promise<Etiqueta[]> => {
  const response = await api.get('/etiquetas');
  return response.data;
};

const criarEtiqueta = async (data: EtiquetaCriacaoDto): Promise<Etiqueta> => {
  const response = await api.post('/etiquetas/adicionarEtiqueta', data);
  return response.data;
};

const atualizarEtiqueta = async (id: string, data: EtiquetaAtualizacaoDto): Promise<void> => {
  await api.put(`/etiquetas/${id}`, data);
};

const deletarEtiqueta = async (id: string): Promise<void> => {
  await api.delete(`/etiquetas/${id}`);
};

const EtiquetaService = {
  listar: listarEtiquetas,
  criar: criarEtiqueta,
  atualizar: atualizarEtiqueta,
  deletar: deletarEtiqueta,
};

export default EtiquetaService;