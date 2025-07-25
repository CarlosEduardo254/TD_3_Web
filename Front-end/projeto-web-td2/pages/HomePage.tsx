import React from 'react';
import { Link } from 'react-router-dom';
import { Project, Task, Label, TaskStatus } from '../types';

interface HomePageProps {
  projects: Project[];
  tasks: Task[];
  labels: Label[];
}

export const HomePage: React.FC<HomePageProps> = ({ projects, tasks, labels }) => {
  const stats = [
    { name: 'Tarefas Pendentes', count: tasks.filter(t => t.status === TaskStatus.PENDENTE).length, path: '/tarefas', bgColor: 'bg-[#1D1A4B]', textColor: 'text-[#E0E0E0]' },
    { name: 'Meus Projetos', count: projects.length, path: '/projetos', bgColor: 'bg-[#596073]', textColor: 'text-[#0F1026]' },
    { name: 'Minhas Tarefas Totais', count: tasks.length, path: '/tarefas', bgColor: 'bg-[#8C8A6C]', textColor: 'text-[#10102E]' },
    { name: 'Minhas Etiquetas', count: labels.length, path: '/etiquetas', bgColor: 'bg-[#0F1026]', textColor: 'text-[#E0E0E0]', border: 'border-2 border-[#596073]' },
   ];

  return (
    <div className="animate-fadeIn">
      <header className="bg-[#0F1026] shadow-lg rounded-lg mb-8 p-6 border border-[#1D1A4B]">
        <h1 className="text-4xl font-bold text-[#E0E0E0]">Bem-vindo ao Seu Gestor de Tarefas</h1>
        <p className="mt-2 text-lg text-[#A0A0A0]">
          Gerencie seus projetos, tarefas e etiquetas de forma eficiente.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <Link to={stat.path} key={stat.name} className={`block p-6 ${stat.bgColor} ${stat.textColor} ${stat.border || ''} rounded-lg shadow-lg hover:opacity-90 transition-opacity`}>
            <h2 className="text-xl font-semibold">{stat.name}</h2>
            <p className="text-3xl font-bold mt-2">{stat.count}</p>
          </Link>
        ))}
      </div>

      <div className="bg-[#0F1026] shadow-lg rounded-lg p-6 border border-[#1D1A4B]">
        <h2 className="text-2xl font-semibold text-[#E0E0E0] mb-4">Links Rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/tarefas" className="bg-[#1D1A4B] text-[#E0E0E0] p-4 rounded-lg hover:bg-[#0F1026] transition-colors flex items-center space-x-2 border border-[#596073] hover:border-[#8C8A6C]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.172A48.354 48.354 0 0012 3.492c-2.33 0-4.513.38-6.524.978C4.345 4.01 3.5 4.973 3.5 6.108v9.642a2.25 2.25 0 002.25 2.25h1.5m-3.75-1.5h12.75" />
            </svg>
            <span>Ver Minhas Tarefas</span>
          </Link>
          <Link to="/projetos" className="bg-[#1D1A4B] text-[#E0E0E0] p-4 rounded-lg hover:bg-[#0F1026] transition-colors flex items-center space-x-2 border border-[#596073] hover:border-[#8C8A6C]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            <span>Gerenciar Meus Projetos</span>
          </Link>
        </div>
      </div>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};