import React from 'react';

interface CartaoProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Cartao: React.FC<CartaoProps> = ({ children, className = '', hover = false }) => {
  const hoverClass = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  
  return (
    <div
      className={`bg-white dark:bg-black rounded-lg shadow-md dark:shadow-gray-900/50 p-6 transition-all duration-300 ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default Cartao;

