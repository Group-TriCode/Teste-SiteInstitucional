import React from 'react';

interface BotaoProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const Botao: React.FC<BotaoProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  className = '',
  disabled = false
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
    secondary: 'bg-purple-800 text-white hover:bg-purple-900 focus:ring-purple-700',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white focus:ring-purple-500'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed hover:bg-purple-600';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? disabledClasses : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Botao;

