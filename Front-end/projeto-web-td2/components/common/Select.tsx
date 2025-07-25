
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string | number; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, id, options, error, className, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-medium text-[#E0E0E0] mb-1">{label}</label>}
      <select
        id={id}
        className={`mt-1 block w-full px-3 py-2 bg-[#1D1A4B] border border-[#596073] rounded-md shadow-sm focus:outline-none focus:ring-[#8C8A6C] focus:border-[#8C8A6C] sm:text-sm text-[#E0E0E0] ${className} ${error ? 'border-red-500' : ''}`}
        {...props}
      >
        <option value="" className="text-[#A0A0A0]">Selecione {label?.toLowerCase() || 'uma opção'}</option>
        {options.map(option => (
          <option key={option.value} value={option.value} className="bg-[#1D1A4B] text-[#E0E0E0]">{option.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};