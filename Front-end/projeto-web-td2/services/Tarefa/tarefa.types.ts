import { type Etiqueta } from "../Etiqueta/etiqueta.types";

export interface Tarefa {
  id: string; 
  titulo: string;
  prazo: string; 
  status: string; 
  projetoId: string;
  etiquetas: Etiqueta[];
}

// Para criar ou atualizar, a estrutura é um pouco diferente
export interface TarefaDto {
  titulo: string;
  prazo: string;
  status: string;
  etiquetaIds: string[]; // Array de Guids
}