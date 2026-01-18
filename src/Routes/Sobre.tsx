import React from 'react';
import Cartao from '../Components/Cartao';

const Sobre: React.FC = () => {
  const values = [
    {
      title: 'Inovação',
      description: 'Sempre buscando as melhores tecnologias e metodologias para entregar soluções de ponta.',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Qualidade',
      description: 'Comprometidos com código limpo, testes rigorosos e padrões de excelência em cada projeto.',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      title: 'Transparência',
      description: 'Comunicação clara e honesta em todas as etapas do desenvolvimento.',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: 'Compromisso',
      description: 'Dedicação total ao sucesso dos nossos clientes e entrega dentro dos prazos estabelecidos.',
      icon: (
        <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  const team = [
    {
      name: 'Equipe Especializada',
      role: 'Desenvolvedores Full Stack',
      description: 'Profissionais experientes em diversas tecnologias e frameworks modernos.'
    },
    {
      name: 'Metodologia Ágil',
      role: 'Scrum & Kanban',
      description: 'Trabalhamos com metodologias ágeis para garantir entregas rápidas e eficientes.'
    },
    {
      name: 'Suporte Contínuo',
      role: 'Manutenção & Evolução',
      description: 'Oferecemos suporte técnico e evolução contínua dos sistemas desenvolvidos.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <section className="bg-gradient-to-b from-black via-purple-950 to-black dark:from-black dark:via-purple-950 dark:to-black text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Sobre a <span className="text-purple-500">TriCode</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 px-4">
              Somos uma empresa de software dedicada a transformar desafios em soluções tecnológicas inovadoras
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                Nossa Missão
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto px-4">
                A TriCode nasceu com o propósito de democratizar o acesso a soluções de software de alta qualidade. 
                Acreditamos que toda empresa, independente do tamanho, merece tecnologia de ponta para impulsionar 
                seu crescimento. Combinamos expertise técnica, criatividade e comprometimento para entregar projetos 
                que superam expectativas e geram resultados reais para nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                Nossos Valores
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                Princípios que guiam cada projeto e relacionamento
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {values.map((value, index) => (
                <Cartao key={index} hover className="text-center">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </Cartao>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                Como Trabalhamos
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                Processo estruturado para garantir o sucesso do seu projeto
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {team.map((item, index) => (
              <Cartao key={index} className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">{item.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </Cartao>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50 dark:bg-black transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                Nosso Processo
              </h2>
            </div>
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Análise e Planejamento',
                  description: 'Entendemos profundamente suas necessidades e objetivos para criar um plano de ação estratégico.'
                },
                {
                  step: '2',
                  title: 'Desenvolvimento',
                  description: 'Desenvolvemos a solução seguindo as melhores práticas, com código limpo e arquitetura escalável.'
                },
                {
                  step: '3',
                  title: 'Testes e Qualidade',
                  description: 'Realizamos testes rigorosos para garantir que tudo funcione perfeitamente antes da entrega.'
                },
                {
                  step: '4',
                  title: 'Entrega e Suporte',
                  description: 'Entregamos o projeto e oferecemos suporte contínuo para evolução e manutenção.'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-6 bg-white dark:bg-black rounded-lg shadow-md dark:shadow-gray-900/50 transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-purple-600 dark:bg-purple-700 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;

