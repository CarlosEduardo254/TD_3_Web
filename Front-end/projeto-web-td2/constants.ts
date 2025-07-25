import { User, Project, Task, Label, TaskStatus } from './types';

export const INITIAL_USERS: User[] = [
  { id: 1, nome: 'Ana Silva', email: 'ana.silva@example.com.br', senha: 'senha123' },
  { id: 2, nome: 'Bruno Costa', email: 'bruno.costa@example.com.br', senha: 'senha456' },
];

export const INITIAL_LABELS: Label[] = [
  { id: 1, nome: 'Urgente', cor: '#FF0000', userId: 1 }, 
  { id: 2, nome: 'Importante', cor: '#FFA500', userId: 1 }, 
  { id: 3, nome: 'Pessoal', cor: '#007BFF', userId: 2 }, 
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 1, titulo: 'Metas de 2024', descricao: 'Definir e acompanhar objetivos pessoais para o ano.', userId: 1 },
  { id: 2, titulo: 'Projeto de Férias', descricao: 'Planejar as atividades e orçamento para as próximas férias.', userId: 2 },
];

export const INITIAL_TASKS: Task[] = [
  { 
    id: 1, 
    titulo: 'Planejar Viagem de Fim de Ano', 
    prazo: '2024-10-15', 
    status: TaskStatus.PENDENTE, 
    projectId: 2, 
    labelIds: [1] 
  },
  { 
    id: 2, 
    titulo: 'Comprar Presentes de Natal', 
    prazo: '2024-11-20', 
    status: TaskStatus.EM_ANDAMENTO, 
    projectId: 2, 
    labelIds: [2] 
  },
  { 
    id: 3, 
    titulo: 'Matrícula na Academia', 
    prazo: '2024-09-01', 
    status: TaskStatus.PENDENTE, 
    projectId: 1, 
    labelIds: [3] 
  },
];

export const TASK_STATUS_OPTIONS = Object.values(TaskStatus).map(status => ({
  value: status,
  label: status,
}));

export const NAVIGATION_ITEMS = [
  { path: '/', label: 'Início', icon: null },
  { path: '/projetos', label: 'Projetos', icon: null },
  { path: '/tarefas', label: 'Tarefas', icon: null },
  { path: '/etiquetas', label: 'Etiquetas', icon: null },
];