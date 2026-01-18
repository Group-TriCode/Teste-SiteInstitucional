import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, type Product } from '../Context/CartContext';
import Cartao from '../Components/Cartao';
import Botao from '../Components/Botao';

const Produtos: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const products: Product[] = [
    {
      id: 'dev-web',
      name: 'Desenvolvimento Web',
      description: 'Soluções web modernas e responsivas utilizando as melhores tecnologias do mercado.',
      price: 10,
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      id: 'sistemas-personalizados',
      name: 'Sistemas Personalizados',
      description: 'Desenvolvimento de sistemas sob medida para atender às necessidades específicas do seu negócio.',
      price: 10,
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 'consultoria-ti',
      name: 'Consultoria em TI',
      description: 'Orientação estratégica para transformação digital e otimização de processos tecnológicos.',
      price: 10,
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'suporte-ti',
      name: 'Suporte em TI',
      description: 'Suporte técnico especializado para resolver problemas e manter seus sistemas funcionando perfeitamente.',
      price: 10,
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    }
  ];

  const handleAddToCart = (product: Product) => {
    addItem(product);
    navigate('/checkout');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <section className="bg-gradient-to-b from-black via-purple-950 to-black dark:from-black dark:via-purple-950 dark:to-black text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Nossos <span className="text-purple-500">Produtos</span> e{' '}
              <span className="text-purple-500">Serviços</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 px-4">
              Escolha o serviço ideal para impulsionar o crescimento do seu negócio
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <Cartao key={product.id} hover className="flex flex-col">
                  <div className="flex justify-center mb-4">{product.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {product.description}
                  </p>
                  <div className="mt-auto">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                      {formatPrice(product.price)}
                    </div>
                    <Botao
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      Adicionar ao Carrinho
                    </Botao>
                  </div>
                </Cartao>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Produtos;
