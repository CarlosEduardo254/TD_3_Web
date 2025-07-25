import React, { useState } from 'react';
import { Project } from '../types'; 
import { ProjectForm } from '../components/ProjectForm';
import { Modal } from '../components/Modal';
import { Button } from '../components/common/Button';

// A ProjectCriacaoDto do service é basicamente um Projeto sem o ID
type ProjectCreationData = Omit<Project, 'id'>;

interface ProjectsPageProps {
  projects: Project[];
  onAddProject: (project: ProjectCreationData) => Promise<void>;
  onUpdateProject: (project: Project) => Promise<void>;
  onDeleteProject: (projectId: string) => Promise<void>; 
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, onAddProject, onUpdateProject, onDeleteProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleOpenModal = (project: Project | null = null) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };
  
  const openDeleteConfirm = (project: Project) => {
    setProjectToDelete(project);
  };

  const closeDeleteConfirm = () => {
    setProjectToDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      onDeleteProject(projectToDelete.id);
      closeDeleteConfirm();
    }
  };

  const handleSubmitProject = (projectData: ProjectCreationData) => {
    if (editingProject) {
      onUpdateProject({ ...editingProject, ...projectData });
    } else {
      onAddProject(projectData);
    }
    handleCloseModal();
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#E0E0E0]">Meus Projetos</h1>
        <Button onClick={() => handleOpenModal()} variant="primary">
          Adicionar Novo Projeto
        </Button>
      </div>

      {projects.length === 0 ? (
         <p className="text-[#A0A0A0]">
           Nenhum projeto encontrado. Clique em "Adicionar Novo Projeto" para começar.
       </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-[#0F1026] shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow border border-[#1D1A4B] hover:border-[#596073]">
              <h2 className="text-xl font-semibold text-[#E0E0E0] mb-2">{project.titulo}</h2>
              <p className="text-sm text-[#A0A0A0] mb-1 h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-[#596073] scrollbar-track-[#1D1A4B]">{project.descricao}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={() => handleOpenModal(project)} variant="ghost" size="sm">Editar</Button>
                <Button onClick={() => openDeleteConfirm(project)} variant="ghost" size="sm" className="text-red-500 hover:bg-red-700 hover:text-white">Excluir</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingProject ? 'Editar Projeto' : 'Adicionar Novo Projeto'}>
        <ProjectForm
          initialData={editingProject}
          onSubmit={handleSubmitProject}
          onCancel={handleCloseModal}
        />
      </Modal>

      <Modal isOpen={!!projectToDelete} onClose={closeDeleteConfirm} title="Confirmar Exclusão">
        {projectToDelete && (
          <div>
            <p className="text-[#E0E0E0] mb-4">
              Tem certeza de que deseja excluir o projeto "<strong>{projectToDelete.titulo}</strong>"?
              <br />
              Todas as tarefas associadas também serão excluídas. Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={closeDeleteConfirm}>Cancelar</Button>
              <Button variant="danger" onClick={handleDeleteConfirm}>Excluir Projeto</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Estilos... */}
    </div>
  );
};