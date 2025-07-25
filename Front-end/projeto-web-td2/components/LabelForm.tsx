import React, { useState, useEffect } from 'react';
import { Label, LabelFormProps } from '../types';
import { Input } from './common/Input';
import { Button } from './common/Button';

export const LabelForm: React.FC<Omit<LabelFormProps, 'users'>> = ({ initialData, onSubmit, onCancel }) => {
  const [label, setLabel] = useState<Omit<Label, 'id' | 'userId'>>({ 
    nome: '',
    cor: '#000000',
  });

  useEffect(() => {
    if (initialData) {
      const { userId, id, ...formData } = initialData;
      setLabel(formData);
    } else {
      setLabel({ nome: '', cor: '#000000' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLabel(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(label);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome da Etiqueta"
        id="nome"
        name="nome"
        value={label.nome}
        onChange={handleChange}
        required
      />
      <Input
        label="Cor"
        id="cor"
        name="cor"
        type="color"
        value={label.cor}
        onChange={handleChange}
        className="h-10"
        required
      />
      <div className="flex justify-end space-x-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary">{initialData ? 'Atualizar Etiqueta' : 'Criar Etiqueta'}</Button>
      </div>
    </form>
  );
};