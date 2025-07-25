export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
}

export type ProjetoCriacaoDto = Omit<Projeto, 'id'>;
export type ProjetoAtualizacaoDto = Omit<Projeto, 'id'>;