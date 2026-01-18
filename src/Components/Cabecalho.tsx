import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Botao from './Botao';
import AlternadorTema from './AlternadorTema';
import { useCart } from '../Context/CartContext';

const Cabecalho: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const handleFaleConosco = () => {
    setIsMenuOpen(false);
    navigate('/contato#pronto-para-comecar');
  };

  const handleCarrinho = () => {
    setIsMenuOpen(false);
    navigate('/checkout');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/produtos', label: 'Produtos' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contato', label: 'Contato' }
  ];

  return (
    <header className="bg-black sticky top-0 z-50 shadow-lg transition-colors duration-300">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src="/TriCode Logo.png" alt="TriCode Logo" className="h-20 w-auto" />
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <AlternadorTema />
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-purple-500'
                    : 'text-white hover:text-purple-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleCarrinho}
              className="relative p-2 text-white hover:text-purple-400 transition-colors duration-200"
              aria-label="Carrinho de compras"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
            <button onClick={handleFaleConosco}>
              <Botao variant="primary" size="sm">
                Fale Conosco
              </Botao>
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <AlternadorTema />
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-purple-500'
                      : 'text-white hover:text-purple-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleCarrinho}
                className="flex items-center justify-between text-base font-medium text-white hover:text-purple-400 transition-colors duration-200"
              >
                <span>Carrinho</span>
                {itemCount > 0 && (
                  <span className="bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>
              <button onClick={handleFaleConosco} className="w-full">
                <Botao variant="primary" size="sm" className="w-full">
                  Fale Conosco
                </Botao>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Cabecalho;

