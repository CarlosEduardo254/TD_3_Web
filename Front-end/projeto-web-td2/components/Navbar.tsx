import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../constants';
import { User } from '../types';
import { Button } from './common/Button';

interface NavbarProps {
  currentUser: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser, onLogout }) => {
  return (
    <nav className="bg-[#1D1A4B] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-[#E0E0E0] text-2xl font-bold hover:text-[#8C8A6C] transition-colors">
            Meu Gestor
          </NavLink>
          <div className="flex items-center space-x-4">
            {NAVIGATION_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#596073] text-[#0F1026]'
                      : 'text-[#E0E0E0] hover:bg-[#596073] hover:text-[#0F1026]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {currentUser && (
              <>
                <span className="text-sm text-[#E0E0E0]">Olá, {currentUser.nome.split(' ')[0]}</span>
                <Button onClick={onLogout} variant="ghost" size="sm">
                  Sair
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};