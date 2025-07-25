import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, Project as ProjectType, Label as LabelType } from '../types'; // Renamed to avoid conflict
import { Input } from './common/Input';
import { Select } from './common/Select';
import { Button } from './common/Button';
import { TASK_STATUS_OPTIONS } from '../constants';


interface InternalTaskFormProps {
  initialData?: Task | null;
  projects: ProjectType[]; // Projetos disponíveis
  labels: LabelType[];  // Etiquetas disponíveis
  onSubmit: (task: Omit<Task, 'id'> | Task) => void;
  onCancel: () => void;
}


export const TaskForm: React.FC<InternalTaskFormProps> = ({ initialData, projects, labels, onSubmit, onCancel }) => {
  const [task, setTask] = useState<Omit<Task, 'id'>>({
    titulo: '',
    prazo: '',
    status: TaskStatus.PENDENTE,
    projectId: 0,
    labelIds: [],
  });

  useEffect(() => {
    if (initialData) {
      const { id, ...formData } = initialData;
      setTask(formData);
    } else {
      setTask({
        titulo: '',
        prazo: new Date().toISOString().split('T')[0], 
        status: TaskStatus.PENDENTE,
        projectId: projects[0]?.id || 0, 
        labelIds: [],
      });
    }
  }, [initialData, projects]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: name === 'projectId' ? (value ? parseInt(value, 10) : 0) : value,
    }));
  };

  const handleLabelChange = (labelId: number) => {
    setTask(prev => {
      const newLabelIds = prev.labelIds.includes(labelId)
        ? prev.labelIds.filter(id => id !== labelId)
        : [...prev.labelIds, labelId];
      return { ...prev, labelIds: newLabelIds };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.projectId && projects.length > 0) { 
        alert("Por favor, selecione um projeto.");
        return;
    }
    
    if (initialData) { 
      onSubmit({ ...initialData, ...task });
    } else { 
      onSubmit(task);
    }
  };

  const projectOptions = projects.map(p => ({ value: p.id, label: p.titulo })); 

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Título da Tarefa"
        id="titulo"
        name="titulo"
        value={task.titulo}
        onChange={handleChange}
        required
      />
      <Input
        label="Prazo Final"
        id="prazo"
        name="prazo"
        type="date"
        value={task.prazo}
        onChange={handleChange}
        required
      />
      <Select
        label="Status"
        id="status"
        name="status"
        value={task.status}
        onChange={handleChange}
        options={TASK_STATUS_OPTIONS}
        required
      />
      <Select
        label="Projeto"
        id="projectId"
        name="projectId"
        value={task.projectId}
        onChange={handleChange}
        options={projectOptions} // Projetos específicos do usuário
        required={projects.length > 0} // Exigir apenas se existirem projetos para o usuário
        disabled={projects.length === 0}
      />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#E0E0E0] mb-1">Etiquetas</label>
        <div className="space-y-2 max-h-32 overflow-y-auto p-2 border border-[#596073] rounded-md bg-[#1D1A4B] scrollbar-thin scrollbar-thumb-[#596073] scrollbar-track-[#0F1026]">
          {labels.length === 0 && <p className="text-sm text-[#A0A0A0]">Nenhuma etiqueta pessoal disponível. Crie suas etiquetas primeiro.</p>}
          {labels.map(label => ( // Etiquetas específicas do usuário
            <div key={label.id} className="flex items-center">
              <input
                type="checkbox"
                id={`label-${label.id}`}
                checked={task.labelIds.includes(label.id)}
                onChange={() => handleLabelChange(label.id)}
                className="h-4 w-4 text-[#596073] border-[#596073] rounded focus:ring-[#8C8A6C] bg-[#1D1A4B]"
              />
              <label htmlFor={`label-${label.id}`} className="ml-2 text-sm text-[#E0E0E0] flex items-center">
                <span style={{ backgroundColor: label.cor }} className="w-3 h-3 rounded-full mr-2 inline-block border border-[#596073]"></span>
                {label.nome}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary">{initialData ? 'Atualizar Tarefa' : 'Criar Tarefa'}</Button>
      </div>
       <style>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #596073 #0F1026;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #0F1026;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #596073;
          border-radius: 10px;
          border: 2px solid #0F1026;
        }
      `}</style>
    </form>
  );
};