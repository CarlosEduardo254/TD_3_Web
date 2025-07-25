import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User, Project, Task, Label } from './types';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TasksPage } from './pages/TasksPage';
import { LabelsPage } from './pages/LabelsPage';
import { LoginPage } from './pages/LoginPage'; 
import { RegisterPage } from './pages/RegisterPage';
import { INITIAL_USERS, INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_LABELS } from './constants';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('crud-app-users');
    const parsedUsers = savedUsers ? JSON.parse(savedUsers) : [];
    return parsedUsers.length > 0 ? parsedUsers : INITIAL_USERS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('crud-app-projects');
    return savedProjects ? JSON.parse(savedProjects) : INITIAL_PROJECTS;
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('crud-app-tasks');
    return savedTasks ? JSON.parse(savedTasks) : INITIAL_TASKS;
  });
  const [labels, setLabels] = useState<Label[]>(() => {
    const savedLabels = localStorage.getItem('crud-app-labels');
    return savedLabels ? JSON.parse(savedLabels) : INITIAL_LABELS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('crud-app-currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [nextUserId, setNextUserId] = useState(() => {
    const currentMaxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
    const initialMaxId = INITIAL_USERS.length > 0 ? Math.max(...INITIAL_USERS.map(u => u.id)) : 0;
    return Math.max(currentMaxId, initialMaxId) + 1;
  });
  const [nextProjectId, setNextProjectId] = useState(() => projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1);
  const [nextTaskId, setNextTaskId] = useState(() => tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1);
  const [nextLabelId, setNextLabelId] = useState(() => labels.length > 0 ? Math.max(...labels.map(l => l.id)) + 1 : 1);

  useEffect(() => { localStorage.setItem('crud-app-users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('crud-app-projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('crud-app-tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('crud-app-labels', JSON.stringify(labels)); }, [labels]);
  useEffect(() => { 
    if (currentUser) {
      localStorage.setItem('crud-app-currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('crud-app-currentUser');
    }
  }, [currentUser]);

  const handleLogin = (email: string, senha_login: string): boolean => {
    const user = users.find(u => u.email === email && u.senha === senha_login);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    alert('Email ou senha inválidos.');
    return false;
  };

  const handleRegister = (nome: string, email: string, senha_register: string): boolean => {
    if (users.find(u => u.email === email)) {
      alert('Este email já está registrado.');
      return false;
    }
    const newUser: User = {
      id: nextUserId,
      nome,
      email,
      senha: senha_register,
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    setNextUserId(prev => prev + 1);
    setCurrentUser(newUser);// Login automático após o registro
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const userProjects = currentUser ? projects.filter(p => p.userId === currentUser.id) : [];
  const userLabels = currentUser ? labels.filter(l => l.userId === currentUser.id) : [];
  const userProjectIds = userProjects.map(p => p.id);
  const userTasks = currentUser ? tasks.filter(t => userProjectIds.includes(t.projectId)) : [];

  const addProject = (projectData: Omit<Project, 'id' | 'userId'>) => {
    if (!currentUser) return;
    const newProject = { ...projectData, id: nextProjectId, userId: currentUser.id };
    setProjects(prev => [...prev, newProject]);
    setNextProjectId(prev => prev + 1);
  };
  const updateProject = (updatedProject: Project) => {
    if (!currentUser || updatedProject.userId !== currentUser.id) {
      alert("Não autorizado a atualizar este projeto.");
      return;
    }
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };
  const deleteProject = (projectId: number) => {
    if (!currentUser) return;
    const projectToDelete = projects.find(p => p.id === projectId);
    if (!projectToDelete || projectToDelete.userId !== currentUser.id) {
       alert("Não autorizado a excluir este projeto.");
       return;
    }
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setTasks(prev => prev.filter(t => t.projectId !== projectId)); 
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    if (!currentUser) return;
    const project = projects.find(p => p.id === taskData.projectId);
    if (!project || project.userId !== currentUser.id) {
      alert("Não é possível adicionar tarefa a um projeto que não é seu.");
      return;
    }
    const newTask = { ...taskData, id: nextTaskId };
    setTasks(prev => [...prev, newTask]);
    setNextTaskId(prev => prev + 1);
  };
  const updateTask = (updatedTask: Task) => {
     if (!currentUser) return;
     const project = projects.find(p => p.id === updatedTask.projectId);
     if (!project || project.userId !== currentUser.id) {
       alert("Não autorizado a atualizar esta tarefa.");
       return;
     }
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };
  const deleteTask = (taskId: number) => {
    if (!currentUser) return;
    const taskToDelete = tasks.find(t => t.id === taskId);
    if (!taskToDelete) return;
    const project = projects.find(p => p.id === taskToDelete.projectId);
    if (!project || project.userId !== currentUser.id) {
      alert("Não autorizado a excluir esta tarefa.");
      return;
    }
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const addLabel = (labelData: Omit<Label, 'id' | 'userId'>) => {
    if (!currentUser) return;
    const newLabel = { ...labelData, id: nextLabelId, userId: currentUser.id };
    setLabels(prev => [...prev, newLabel]);
    setNextLabelId(prev => prev + 1);
  };
  const updateLabel = (updatedLabel: Label) => {
    if (!currentUser || updatedLabel.userId !== currentUser.id) {
      alert("Não autorizado a atualizar esta etiqueta.");
      return;
    }
    setLabels(prev => prev.map(l => l.id === updatedLabel.id ? updatedLabel : l));
  };
  const deleteLabel = (labelId: number) => {
    if (!currentUser) return;
    const labelToDelete = labels.find(l => l.id === labelId);
    if(!labelToDelete || labelToDelete.userId !== currentUser.id) {
      alert("Não autorizado a excluir esta etiqueta.");
      return;
    }
    setLabels(prev => prev.filter(l => l.id !== labelId));
    setTasks(prevTasks => prevTasks.map(task => ({
      ...task,
      labelIds: task.labelIds.filter(id => id !== labelId),
    })));
  };

  const getProjectTitleById = useCallback((projectId: number) => projects.find(p => p.id === projectId)?.titulo || 'N/D', [projects]);
  const getLabelsByIds = useCallback((labelIds: number[]) => {
    return userLabels.filter(l => labelIds.includes(l.id));
  }, [userLabels]);

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!currentUser) {
        navigate('/login', { replace: true });
      }
    }, [currentUser, navigate]);
    return currentUser ? <>{children}</> : null; 
  };
  
  const LoginPageWithNavigate: React.FC = () => {
    const navigate = useNavigate();
    return <LoginPage onLogin={(email, pass) => {
      if (handleLogin(email, pass)) {
        navigate('/', { replace: true });
      }
    }} />;
  };

  const RegisterPageWithNavigate: React.FC = () => {
    const navigate = useNavigate();
    return <RegisterPage onRegister={(name, email, pass) => {
      const success = handleRegister(name, email, pass);
      if (success) {
        navigate('/', { replace: true });
      }
      return success; 
    }} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#10102E] text-[#E0E0E0]">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/login" element={<LoginPageWithNavigate />} />
          <Route path="/register" element={<RegisterPageWithNavigate />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage projects={userProjects} tasks={userTasks} labels={userLabels} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/projetos" 
            element={
              <ProtectedRoute>
                <ProjectsPage 
                  projects={userProjects} 
                  onAddProject={addProject} 
                  onUpdateProject={updateProject} 
                  onDeleteProject={deleteProject}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tarefas" 
            element={
              <ProtectedRoute>
                <TasksPage 
                  tasks={userTasks} 
                  projects={userProjects} 
                  labels={userLabels} 
                  onAddTask={addTask} 
                  onUpdateTask={updateTask} 
                  onDeleteTask={deleteTask} 
                  getProjectTitleById={getProjectTitleById} 
                  getLabelsByIds={getLabelsByIds} 
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/etiquetas" 
            element={
              <ProtectedRoute>
                <LabelsPage 
                  labels={userLabels} 
                  onAddLabel={addLabel} 
                  onUpdateLabel={updateLabel} 
                  onDeleteLabel={deleteLabel} 
                />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
        </Routes>
      </main>
      <footer className="bg-[#0F1026] text-[#A0A0A0] text-center p-4 text-sm border-t border-[#1D1A4B]">
        Gestor de Tarefas Pessoais &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export const WrappedApp = () => (
  <HashRouter>
    <App />
  </HashRouter>
);