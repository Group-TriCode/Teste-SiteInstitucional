import React from 'react';
import { Link } from 'react-router-dom';

const Rodape: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img src="/TriCode Logo.png" alt="TriCode Logo" className="h-20 w-auto mb-4" />
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Transformando ideias em soluções de software inovadoras. 
              Desenvolvemos tecnologia de ponta para impulsionar o crescimento do seu negócio.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 2H8a6 6 0 00-6 6v8a6 6 0 006 6h8a6 6 0 006-6V8a6 6 0 00-6-6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5h.01" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-500">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-500">Contato</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/contato" className="hover:text-white transition-colors duration-200">
                  Entre em contato
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} TriCode. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;

