export interface User {
  id: string; 
  nome: string;
  email: string;
}


export interface Project {
  id: string;
  titulo: string;
  descricao: string;
}


export interface Label {
  id: string;
  nome: string;
  cor: string;
}

export interface Task {
  id: string;
  titulo: string;
  prazo: string;
  status: string;
  projetoId: string;
  etiquetas: Label[]; 
}

// Enum permanece o mesmo
export enum TaskStatus {
  PENDENTE = 'Pendente',
  EM_ANDAMENTO = 'Em Andamento',
  CONCLUIDA = 'Concluído',
}