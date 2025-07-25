import React, { useState } from 'react';
import { Task, Project, Label, TaskStatus } from '../types';
import { TaskForm, TaskFormData } from '../components/TaskForm';
import { Modal } from '../components/Modal';
import { Button } from '../components/common/Button';

interface TasksPageProps {
  tasks: Task[];
  projects: Project[];
  labels: Label[];
  onAddTask: (projetoId: string, taskData: Omit<TaskFormData, 'projetoId'>) => Promise<void>;
  onUpdateTask: (task: Task) => Promise<void>;
  onMoveTask: (task: Task, newProjectId: string) => Promise<void>;
  onDeleteTask: (task: Task) => Promise<void>;
}

const TaskStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let bgColor = 'bg-slate-200';
  let textColor = 'text-slate-800';

  switch (status) {
    case TaskStatus.PENDENTE:
      bgColor = 'bg-yellow-500'; textColor = 'text-black'; break;
    case TaskStatus.EM_ANDAMENTO:
      bgColor = 'bg-[#596073]'; textColor = 'text-[#E0E0E0]'; break;
    case TaskStatus.CONCLUIDA:
      bgColor = 'bg-green-600'; textColor = 'text-white'; break;
  }
  return (
    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export const TasksPage: React.FC<TasksPageProps> = ({ 
  tasks, projects, labels, 
  onAddTask, onUpdateTask, onMoveTask, onDeleteTask
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleOpenModal = (task: Task | null = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };
  
  const openDeleteConfirm = (task: Task) => {
    setTaskToDelete(task);
  };

  const closeDeleteConfirm = () => {
    setTaskToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete);
      closeDeleteConfirm();
    }
  };

  const handleSubmitTask = async (formData: TaskFormData) => {
    if (editingTask) {
      const projetoMudou = editingTask.projetoId !== formData.projetoId;

      const updatedTask: Task = {
        ...editingTask,
        titulo: formData.titulo,
        prazo: formData.prazo,
        status: formData.status,
        projetoId: formData.projetoId,
        etiquetas: labels.filter(l => formData.etiquetaIds.includes(l.id))
      };

      if (projetoMudou) {
        await onMoveTask(editingTask, formData.projetoId);
      }
      
      await onUpdateTask(updatedTask);

    } else {
      const { projetoId, ...taskData } = formData;
      await onAddTask(projetoId, taskData);
    }
    handleCloseModal();
  };

  const canCreateTask = projects.length > 0;

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#E0E0E0]">Minhas Tarefas</h1>
        <Button onClick={() => handleOpenModal()} variant="primary" disabled={!canCreateTask}>
          {!canCreateTask ? "Crie um Projeto Primeiro" : "Adicionar Nova Tarefa"}
        </Button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-[#A0A0A0]">
          {!canCreateTask
            ? "Por favor, crie um projeto antes de adicionar tarefas."
            : 'Nenhuma tarefa encontrada. Clique em "Adicionar Nova Tarefa" para começar.'}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => {
            const projectTitle = projects.find(p => p.id === task.projetoId)?.titulo || 'Projeto Desconhecido';
            return (
              <div key={task.id} className="bg-[#0F1026] shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow border border-[#1D1A4B] hover:border-[#596073]">
                <div>
                  <h2 className="text-xl font-semibold text-[#E0E0E0] mb-1">{task.titulo}</h2>
                  <TaskStatusBadge status={task.status} />
                  <p className="text-sm text-[#A0A0A0] mt-2 mb-1">Projeto: {projectTitle}</p>
                  <p className="text-sm text-[#A0A0A0] mb-1">Prazo: {new Date(task.prazo).toLocaleDateString()}</p>
                  {task.etiquetas?.length > 0 && (
                    <div className="mt-2 mb-3">
                      <p className="text-xs text-[#8C8A6C] mb-1">Etiquetas:</p>
                      <div className="flex flex-wrap gap-1">
                        {task.etiquetas.map(label => (
                          <span key={label.id} style={{ backgroundColor: label.cor }} className="px-2 py-0.5 text-xs rounded-full text-white shadow-sm">{label.nome}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button onClick={() => handleOpenModal(task)} variant="ghost" size="sm">Editar</Button>
                  <Button onClick={() => openDeleteConfirm(task)} variant="ghost" size="sm" className="text-red-500 hover:bg-red-700 hover:text-white">Excluir</Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTask ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}>
        <TaskForm
          initialData={editingTask}
          projects={projects}
          labels={labels}
          onSubmit={handleSubmitTask}
          onCancel={handleCloseModal}
        />
      </Modal>

      <Modal isOpen={!!taskToDelete} onClose={closeDeleteConfirm} title="Confirmar Exclusão">
        {taskToDelete && (
          <div>
            <p className="text-[#E0E0E0] mb-4">
              Tem certeza de que deseja excluir a tarefa "<strong>{taskToDelete.titulo}</strong>"?
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={closeDeleteConfirm}>Cancelar</Button>
              <Button variant="danger" onClick={handleDeleteConfirm}>Excluir Tarefa</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
