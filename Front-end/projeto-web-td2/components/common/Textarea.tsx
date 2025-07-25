
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, error, className, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-medium text-[#E0E0E0] mb-1">{label}</label>}
      <textarea
        id={id}
        rows={4}
        className={`mt-1 block w-full px-3 py-2 bg-[#1D1A4B] border border-[#596073] rounded-md shadow-sm focus:outline-none focus:ring-[#8C8A6C] focus:border-[#8C8A6C] sm:text-sm text-[#E0E0E0] placeholder-[#A0A0A0] ${className} ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};