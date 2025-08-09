import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

// A reusable input component to ensure consistent styling for form fields.
const Input: React.FC<InputProps> = ({ label, id, containerClassName = '', className = '', ...props }) => {
  const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-brand-primary focus:border-brand-primary";

  return (
    <div className={containerClassName}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      <input id={id} className={`${inputClasses} ${className}`} {...props} />
    </div>
  );
};

export default Input;