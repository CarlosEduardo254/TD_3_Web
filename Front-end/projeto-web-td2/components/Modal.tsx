import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-75 transition-opacity duration-300 ease-in-out p-4 pt-10">
      {/* Painel com o preenchimento superior/inferior*/}
      <div className="bg-[#0F1026] rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow border border-[#596073] flex flex-col max-h-[calc(100vh-3.5rem)]">
        
        {/* Cabeçalho da Modal */}
        <div className="flex-shrink-0 flex justify-between items-center px-6 pt-6">
          <h2 className="text-xl font-semibold text-[#E0E0E0]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#A0A0A0] hover:text-[#E0E0E0] text-2xl"
            aria-label="Fechar modal"
          >
            &times;
          </button>
        </div>
        
        <div className="flex-grow min-h-0 px-6 pb-6 pt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#596073] scrollbar-track-[#0F1026]">
          {children}
        </div>
      </div>
      
      <style>{`
        @keyframes modalShow {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modalShow {
          animation: modalShow 0.3s forwards;
        }
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
    </div>
  );
};
