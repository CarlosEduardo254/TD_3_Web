export interface Etiqueta {
  id: string;
  nome: string;
  cor: string;
}

export type EtiquetaCriacaoDto = Omit<Etiqueta, 'id'>;
export type EtiquetaAtualizacaoDto = Omit<Etiqueta, 'id'>;