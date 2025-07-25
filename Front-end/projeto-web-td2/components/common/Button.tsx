
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed';
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-[#596073] text-[#E0E0E0] hover:bg-[#8C8A6C] focus:ring-[#8C8A6C] focus:ring-offset-[#10102E]';
      break;
    case 'secondary':
      variantStyles = 'bg-[#1D1A4B] text-[#E0E0E0] hover:bg-[#0F1026] focus:ring-[#596073] focus:ring-offset-[#10102E]';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-[#10102E]';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent text-[#8C8A6C] hover:bg-[#1D1A4B] focus:ring-[#8C8A6C] focus:ring-offset-[#10102E]';
      break;
  }

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-4 py-2 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-6 py-3 text-lg';
      break;
  }

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};