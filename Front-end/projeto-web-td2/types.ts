
export interface User {
  id: number;
  nome: string;
  email: string;
  senha?: string; 
}

export interface Project {
  id: number;
  titulo: string;
  descricao: string;
  userId: number; 
}

export enum TaskStatus {
  PENDENTE = 'Pendente',
  EM_ANDAMENTO = 'Em Andamento',
  CONCLUIDA = 'Concluída',
}

export interface Label {
  id: number;
  nome: string;
  cor: string; 
  userId: number; 
}

export interface Task {
  id: number;
  titulo: string;
  prazo: string; 
  status: TaskStatus;
  projectId: number;
  labelIds: number[];
}



export interface ProjectFormProps {
  initialData?: Project | null;
  users: User[]; 
  onSubmit: (project: Omit<Project, 'id' | 'userId'>) => void; 
  onCancel: () => void;
}

export interface LabelFormProps {
  initialData?: Label | null;
  users: User[]; 
  onSubmit: (label: Omit<Label, 'id' | 'userId'>) => void; 
  onCancel: () => void;
}

export interface TaskFormProps {
  initialData?: Task | null;
  projects: Project[];
  labels: Label[];
  onSubmit: (task: Omit<Task, 'id'> | Task) => void;
  onCancel: () => void;
}