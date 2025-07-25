import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, Project, Label } from '../types';
import { Input } from './common/Input';
import { Select } from './common/Select';
import { Button } from './common/Button';
import { TASK_STATUS_OPTIONS } from '../constants';

export interface TaskFormData {
  titulo: string;
  prazo: string;
  status: string;
  projetoId: string;
  etiquetaIds: string[];
}

interface InternalTaskFormProps {
  initialData?: Task | null;
  projects: Project[];
  labels: Label[];
  onSubmit: (task: TaskFormData) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<InternalTaskFormProps> = ({ initialData, projects, labels, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    titulo: '',
    prazo: '',
    status: TaskStatus.PENDENTE,
    projetoId: '',
    etiquetaIds: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
          titulo: initialData.titulo,
          prazo: new Date(initialData.prazo).toISOString().split('T')[0],
          status: initialData.status,
          projetoId: initialData.projetoId,
          etiquetaIds: initialData.etiquetas.map(e => e.id)
      });
    } else {
      setFormData({
        titulo: '',
        prazo: new Date().toISOString().split('T')[0], 
        status: TaskStatus.PENDENTE,
        projetoId: projects[0]?.id || '', 
        etiquetaIds: [],
      });
    }
  }, [initialData, projects]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLabelChange = (labelId: string) => {
    setFormData(prev => {
      const newLabelIds = prev.etiquetaIds.includes(labelId)
        ? prev.etiquetaIds.filter(id => id !== labelId)
        : [...prev.etiquetaIds, labelId];
      return { ...prev, etiquetaIds: newLabelIds };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projetoId && projects.length > 0) { 
        alert("Por favor, selecione um projeto.");
        return;
    }
    onSubmit(formData);
  };

  const projectOptions = projects.map(p => ({ value: p.id, label: p.titulo })); 

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Título da Tarefa" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
      <Input label="Prazo Final" id="prazo" name="prazo" type="date" value={formData.prazo} onChange={handleChange} required />
      <Select label="Status" id="status" name="status" value={formData.status} onChange={handleChange} options={TASK_STATUS_OPTIONS} required />
      <Select label="Projeto" id="projetoId" name="projetoId" value={formData.projetoId} onChange={handleChange} options={projectOptions} required={projects.length > 0} disabled={projects.length === 0} />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#E0E0E0] mb-1">Etiquetas</label>
        <div className="space-y-2 max-h-32 overflow-y-auto p-2 border border-[#596073] rounded-md bg-[#1D1A4B] scrollbar-thin scrollbar-thumb-[#596073] scrollbar-track-[#0F1026]">
          {labels.map(label => (
            <div key={label.id} className="flex items-center">
              <input type="checkbox" id={`label-${label.id}`} checked={formData.etiquetaIds.includes(label.id)} onChange={() => handleLabelChange(label.id)} className="h-4 w-4 text-[#596073] border-[#596073] rounded focus:ring-[#8C8A6C] bg-[#1D1A4B]" />
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
    </form>
  );
};
