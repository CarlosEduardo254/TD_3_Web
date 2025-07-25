import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { JwtPayload, jwtDecode } from "jwt-decode";

// Componentes e Páginas
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TasksPage } from './pages/TasksPage';
import { LabelsPage } from './pages/LabelsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Tipos
import { User, Project, Label, Task } from './types.ts';
import { type ProjetoCriacaoDto } from './services/Projeto/projeto.types.ts';
import { type EtiquetaCriacaoDto } from './services/Etiqueta/etiqueta.types.ts';
import { type TarefaDto } from './services/Tarefa/tarefa.types.ts';

// API e Serviços
import { TOKEN_KEY, getToken } from './services/shared/api.ts';
import ProjetoService from './services/Projeto/projeto.service.ts';
import EtiquetaService from './services/Etiqueta/etiqueta.service.ts';
import TarefaService from './services/Tarefa/tarefa.service.ts';

// Interface para o conteúdo decodificado do Token JWT
interface CustomJwtPayload extends JwtPayload {
  nameid: string;
  email: string;
  unique_name: string;
}

const App: React.FC = () => {
  // Estados de Autenticação
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Estados dos Dados da Aplicação
  const [projects, setProjects] = useState<Project[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const navigate = useNavigate();

  const fetchAllUserData = useCallback(async () => {
    if (!getToken()) {
        setIsLoading(false);
        return;
    }
    setIsLoading(true);
    try {
      const [userProjects, userLabels] = await Promise.all([
        ProjetoService.listar(),
        EtiquetaService.listar(),
      ]);
      setProjects(userProjects);
      setLabels(userLabels);
      
      const tasksPromises = userProjects.map(p => TarefaService.listarPorProjeto(p.id));
      const tasksByProject = await Promise.all(tasksPromises);
      setTasks(tasksByProject.flat());

    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUserFromToken = useCallback(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        const user: User = { id: decodedToken.nameid, email: decodedToken.email, nome: decodedToken.unique_name };
        setCurrentUser(user);
        setIsAuthenticated(true);
        fetchAllUserData();
      } catch (error) {
        console.error("Token inválido ou expirado:", error);
        handleLogout();
      }
    } else {
      setIsLoading(false);
    }
  }, [fetchAllUserData]);

  useEffect(() => {
    fetchUserFromToken();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    fetchUserFromToken();
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setCurrentUser(null);
    setIsAuthenticated(false);
    setProjects([]);
    setLabels([]);
    setTasks([]);
    navigate('/login');
  };

  // --- CRUD ---

  // Projetos
  const addProject = async (projectData: ProjetoCriacaoDto) => {
    const newProject = await ProjetoService.criar(projectData);
    setProjects(prev => [...prev, newProject]);
  };
  const updateProject = async (updatedProject: Project) => {
    await ProjetoService.atualizar(updatedProject.id, updatedProject);
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };
  const deleteProject = async (projectId: string) => {
    await ProjetoService.deletar(projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setTasks(prev => prev.filter(t => t.projetoId !== projectId));
  };

  // Etiquetas
  const addLabel = async (labelData: EtiquetaCriacaoDto) => {
    const newLabel = await EtiquetaService.criar(labelData);
    setLabels(prev => [...prev, newLabel]);
  };
  const updateLabel = async (updatedLabel: Label) => {
    await EtiquetaService.atualizar(updatedLabel.id, updatedLabel);
    setLabels(prev => prev.map(l => l.id === updatedLabel.id ? updatedLabel : l));
  };
  const deleteLabel = async (labelId: string) => {
    await EtiquetaService.deletar(labelId);
    setLabels(prev => prev.filter(l => l.id !== labelId));
    setTasks(prevTasks => prevTasks.map(task => ({
      ...task,
      etiquetas: task.etiquetas.filter(e => e.id !== labelId),
    })));
  };

  // Tarefas
  const addTask = async (projetoId: string, taskData: TarefaDto) => {
    const newTask = await TarefaService.criar(projetoId, taskData);
    setTasks(prev => [...prev, newTask]);
  };
  
  const updateTask = async (updatedTask: Task) => {
    const dto: TarefaDto = {
        titulo: updatedTask.titulo,
        prazo: updatedTask.prazo,
        status: updatedTask.status,
        etiquetaIds: updatedTask.etiquetas.map(e => e.id)
    };
    await TarefaService.atualizar(updatedTask.projetoId, updatedTask.id, dto);
    await fetchAllUserData();
  };

  const moveTask = async (tarefa: Task, novoProjetoId: string) => {
      await TarefaService.mover(tarefa.id, novoProjetoId);
      setTasks(prev => prev.map(t => 
          t.id === tarefa.id ? { ...t, projetoId: novoProjetoId } : t
      ));
  };

  const deleteTask = async (task: Task) => {
    await TarefaService.deletar(task.projetoId, task.id);
    setTasks(prev => prev.filter(t => t.id !== task.id));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-[#10102E] text-white">Carregando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#10102E] text-[#E0E0E0]">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <RegisterPage />} />
          
          {isAuthenticated ? (
            <>
              <Route path="/" element={<HomePage projects={projects} tasks={tasks} labels={labels} />} />
              <Route path="/projetos" element={<ProjectsPage projects={projects} onAddProject={addProject} onUpdateProject={updateProject} onDeleteProject={deleteProject} />} />
              <Route path="/etiquetas" element={<LabelsPage labels={labels} onAddLabel={addLabel} onUpdateLabel={updateLabel} onDeleteLabel={deleteLabel} />} />
              <Route path="/tarefas" element={
                <TasksPage 
                  tasks={tasks} 
                  projects={projects} 
                  labels={labels} 
                  onAddTask={addTask} 
                  onUpdateTask={updateTask} 
                  onMoveTask={moveTask}
                  onDeleteTask={deleteTask} 
                />} 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </main>
    </div>
  );
};

const AppWrapper = () => {
    return (
        <HashRouter>
            <App />
        </HashRouter>
    );
}

export { AppWrapper as WrappedApp };
