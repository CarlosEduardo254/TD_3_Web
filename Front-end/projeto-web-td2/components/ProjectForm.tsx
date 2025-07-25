import React, { useState, useEffect } from 'react';
import { Project, ProjectFormProps } from '../types';
import { Input } from './common/Input';
import { Textarea } from './common/Textarea';
import { Button } from './common/Button';

export const ProjectForm: React.FC<Omit<ProjectFormProps, 'users'>> = ({ initialData, onSubmit, onCancel }) => {
  const [project, setProject] = useState<Omit<Project, 'id' | 'userId'>>({ 
    titulo: '',
    descricao: '',
  });

  useEffect(() => {
    if (initialData) {
      const { userId, id, ...formData } = initialData;
      setProject(formData);
    } else {
      setProject({ titulo: '', descricao: '' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(project); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Título"
        id="titulo"
        name="titulo"
        value={project.titulo}
        onChange={handleChange}
        required
      />
      <Textarea
        label="Descrição"
        id="descricao"
        name="descricao"
        value={project.descricao}
        onChange={handleChange}
        required
      />
      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary">{initialData ? 'Atualizar Projeto' : 'Criar Projeto'}</Button>
      </div>
    </form>
  );
};