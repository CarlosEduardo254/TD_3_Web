import React, { useState } from 'react';
import { Label } from '../types';
import { LabelForm } from '../components/LabelForm';
import { Modal } from '../components/Modal';
import { Button } from '../components/common/Button';


type LabelCreationData = Omit<Label, 'id'>;

interface LabelsPageProps {
  labels: Label[];
  onAddLabel: (label: LabelCreationData) => Promise<void>;
  onUpdateLabel: (label: Label) => Promise<void>;
  onDeleteLabel: (labelId: string) => Promise<void>; 
}

export const LabelsPage: React.FC<LabelsPageProps> = ({ labels, onAddLabel, onUpdateLabel, onDeleteLabel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState<Label | null>(null);
  const [labelToDelete, setLabelToDelete] = useState<Label | null>(null);

  const handleOpenModal = (label: Label | null = null) => {
    setEditingLabel(label);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingLabel(null);
    setIsModalOpen(false);
  };

  const openDeleteConfirm = (label: Label) => {
    setLabelToDelete(label);
  };

  const closeDeleteConfirm = () => {
    setLabelToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (labelToDelete) {
      onDeleteLabel(labelToDelete.id);
      closeDeleteConfirm();
    }
  };

  const handleSubmitLabel = (labelData: LabelCreationData) => {
     if (editingLabel) {
      onUpdateLabel({ ...editingLabel, ...labelData });
    } else {
      onAddLabel(labelData);
    }
    handleCloseModal();
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#E0E0E0]">Minhas Etiquetas</h1>
        <Button onClick={() => handleOpenModal()} variant="primary">
         Adicionar Nova Etiqueta
        </Button>
      </div>

      {labels.length === 0 ? (
        <p className="text-[#A0A0A0]">
        Nenhuma etiqueta encontrada. Clique em "Adicionar Nova Etiqueta" para começar.
      </p>
      ) : (
        <div className="bg-[#0F1026] shadow-lg rounded-lg overflow-hidden border border-[#1D1A4B]">
          <table className="min-w-full divide-y divide-[#1D1A4B]">
            <thead className="bg-[#1D1A4B]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#E0E0E0] uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#E0E0E0] uppercase tracking-wider">Cor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#E0E0E0] uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-[#0F1026] divide-y divide-[#1D1A4B]">
              {labels.map((label) => (
                <tr key={label.id} className="hover:bg-[#1D1A4B] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#E0E0E0]">{label.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#A0A0A0]">
                    <span style={{ backgroundColor: label.cor }} className="w-5 h-5 rounded-full inline-block mr-2 border border-[#596073]"></span>
                    {label.cor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button onClick={() => handleOpenModal(label)} variant="ghost" size="sm">Editar</Button>
                    <Button onClick={() => openDeleteConfirm(label)} variant="ghost" size="sm" className="text-red-500 hover:bg-red-700 hover:text-white">Excluir</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingLabel ? 'Editar Etiqueta' : 'Adicionar Nova Etiqueta'}>
        <LabelForm
          initialData={editingLabel}
          onSubmit={handleSubmitLabel}
          onCancel={handleCloseModal}
        />
      </Modal>

      <Modal isOpen={!!labelToDelete} onClose={closeDeleteConfirm} title="Confirmar Exclusão">
        {labelToDelete && (
          <div>
            <p className="text-[#E0E0E0] mb-4">
              Tem certeza de que deseja excluir a etiqueta "<strong>{labelToDelete.nome}</strong>"?
              <br/>
              Ela será removida de todas as tarefas associadas. Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={closeDeleteConfirm}>Cancelar</Button>
              <Button variant="danger" onClick={handleDeleteConfirm}>Excluir Etiqueta</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};