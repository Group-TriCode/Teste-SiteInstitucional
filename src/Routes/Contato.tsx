import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Cartao from '../Components/Cartao';

const Contato: React.FC = () => {
  const location = useLocation();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (location.hash === '#pronto-para-comecar') {
      const element = document.getElementById('pronto-para-comecar');
      if (element) {
        setTimeout(() => {
          const isMobile = window.innerWidth < 768;
          const offset = isMobile ? 400 : 250;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;
          
          let isScrolling = true;
          let lastScrollTop = window.pageYOffset;
          
          const checkScrollEnd = () => {
            const currentScrollTop = window.pageYOffset;
            
            if (Math.abs(currentScrollTop - lastScrollTop) < 1) {
              if (isScrolling) {
                isScrolling = false;
                setTimeout(() => {
                  setShouldAnimate(true);
                  setTimeout(() => {
                    setShouldAnimate(false);
                  }, 1500);
                }, 200);
              }
            } else {
              lastScrollTop = currentScrollTop;
              requestAnimationFrame(checkScrollEnd);
            }
          };
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          setTimeout(() => {
            requestAnimationFrame(checkScrollEnd);
          }, 300);
          
          setTimeout(() => {
            if (isScrolling) {
              isScrolling = false;
              setShouldAnimate(true);
              setTimeout(() => {
                setShouldAnimate(false);
              }, 1500);
            }
          }, 2000);
        }, 100);
      }
    }
  }, [location]);
  const benefits = [
    {
      title: 'Resposta Rápida',
      description: 'Respondemos em até 24 horas úteis',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Atendimento Personalizado',
      description: 'Cada projeto recebe atenção dedicada',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: 'Solução Customizada',
      description: 'Trabalhamos sob medida para suas necessidades',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <section className="bg-gradient-to-b from-black via-purple-950 to-black dark:from-black dark:via-purple-950 dark:to-black text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Vamos <span className="text-purple-500">Conversar</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-3 md:mb-4">
              Prontos para transformar suas ideias em realidade
            </p>
            <p className="text-base md:text-lg text-gray-400 px-4">
              Entre em contato e descubra como podemos ajudar seu negócio a crescer
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                Entre em Contato
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                Escolha a forma que preferir. Nossa equipe está pronta para atender você com excelência e profissionalismo.
              </p>
            </div>

            <div className="mb-8 md:mb-12">
              <Cartao hover className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                  Email
                </h3>
                <a
                  href="mailto:contatocomtricode@gmail.com"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 text-sm font-medium block mb-3 break-all"
                >
                  contatocomtricode@gmail.com
                </a>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Envie suas dúvidas, solicite um orçamento ou conheça nossos serviços
                </p>
              </Cartao>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {benefits.map((benefit, index) => (
                <Cartao key={index} hover className="text-center p-6">
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {benefit.description}
                  </p>
                </Cartao>
              ))}
            </div>

            <div id="pronto-para-comecar" className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-black rounded-lg p-6 md:p-8 text-white text-center transition-colors duration-300">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
                Pronto para começar seu projeto?
              </h3>
              <p className="text-base md:text-lg text-purple-100 dark:text-purple-200 mb-4 md:mb-6 max-w-2xl mx-auto">
                Não perca tempo! Entre em contato agora e receba uma proposta personalizada para suas necessidades.
              </p>
              <div className="relative inline-block">
                {shouldAnimate && (
                  <>
                    {[...Array(20)].map((_, i) => {
                      const color = '#ffffff';
                      const angle = (360 / 20) * i;
                      const startDistance = 20;
                      const endDistance = 150 + Math.random() * 100;
                      const startX = Math.cos((angle * Math.PI) / 180) * startDistance;
                      const startY = Math.sin((angle * Math.PI) / 180) * startDistance;
                      const endX = Math.cos((angle * Math.PI) / 180) * endDistance;
                      const endY = Math.sin((angle * Math.PI) / 180) * endDistance + 100;
                      const delay = Math.random() * 0.2;
                      const size = 8 + Math.random() * 6;
                      
                      return (
                        <div
                          key={i}
                          className="confetti"
                          style={{
                            '--confetti-color': color,
                            '--end-x': `${endX}px`,
                            '--end-y': `${endY}px`,
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) translate(${startX}px, ${startY}px)`,
                            width: `${size}px`,
                            height: `${size}px`,
                            animationDelay: `${delay}s`,
                            backgroundColor: color,
                          } as React.CSSProperties}
                        />
                      );
                    })}
                  </>
                )}
                <a
                  href="mailto:contatocomtricode@gmail.com"
                  className={`inline-block px-6 py-3 md:px-8 md:py-4 bg-white dark:bg-gray-100 text-purple-600 dark:text-purple-700 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base relative z-10 ${
                    shouldAnimate ? 'animate-[attention-pulse_1.5s_ease-in-out]' : ''
                  }`}
                  style={shouldAnimate ? { animation: 'attention-pulse 1.5s ease-in-out' } : {}}
                >
                  Enviar Email Agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;

