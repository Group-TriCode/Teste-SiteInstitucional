import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import Cartao from '../Components/Cartao';
import Botao from '../Components/Botao';

type PaymentMethod = 'credit_card' | 'debit_card' | 'pix' | 'boleto';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, updateQuantity, removeItem, clearCart, itemCount } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [pixQrCode, setPixQrCode] = useState<string>('');
  const [boletoUrl, setBoletoUrl] = useState<string>('');
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    document: '',
    street: '',
    streetNumber: '',
    neighborhood: '',
    zipcode: '',
    city: '',
    state: ''
  });
  const [cardData, setCardData] = useState({
    number: '',
    holderName: '',
    expirationDate: '',
    cvv: ''
  });
  const [installments, setInstallments] = useState<number>(1);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/produtos');
    }
  }, [items, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpirationDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const formatDocument = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length <= 11) {
      return v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const formatZipcode = (value: string) => {
    const v = value.replace(/\D/g, '');
    return v.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData({ ...cardData, number: formatted });
  };

  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpirationDate(e.target.value);
    setCardData({ ...cardData, expirationDate: formatted });
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDocument(e.target.value);
    setCustomerData({ ...customerData, document: formatted });
  };

  const handleZipcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatZipcode(e.target.value);
    setCustomerData({ ...customerData, zipcode: formatted });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '');
    const formatted = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (v.length <= 10) {
      const formatted10 = v.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      setCustomerData({ ...customerData, phone: formatted10 });
    } else {
      setCustomerData({ ...customerData, phone: formatted });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // IMPORTANTE: Para produção, este processo deve ser feito no backend
      // A chave secreta do Pagar.me NUNCA deve estar no frontend
      
      // Estrutura básica da transação Pagar.me
      const transactionData = {
        amount: Math.round(total * 100), // Valor em centavos
        payment_method: paymentMethod,
        customer: {
          external_id: customerData.document.replace(/\D/g, ''),
          name: customerData.name,
          email: customerData.email,
          type: 'individual',
          country: 'br',
          phone_numbers: [customerData.phone.replace(/\D/g, '')],
          documents: [{
            type: customerData.document.replace(/\D/g, '').length === 11 ? 'cpf' : 'cnpj',
            number: customerData.document.replace(/\D/g, '')
          }]
        },
        billing: {
          name: customerData.name,
          address: {
            country: 'br',
            state: customerData.state,
            city: customerData.city,
            neighborhood: customerData.neighborhood,
            street: customerData.street,
            street_number: customerData.streetNumber,
            zipcode: customerData.zipcode.replace(/\D/g, '')
          }
        },
        items: items.map(item => ({
          id: item.id,
          title: item.name,
          unit_price: Math.round(item.price * 100),
          quantity: item.quantity,
          tangible: false
        }))
      };

      // Adicionar dados específicos do método de pagamento
      if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
        (transactionData as any).card = {
          number: cardData.number.replace(/\s/g, ''),
          holder_name: cardData.holderName,
          exp_month: cardData.expirationDate.split('/')[0],
          exp_year: '20' + cardData.expirationDate.split('/')[1],
          cvv: cardData.cvv
        };
        
        // Adicionar informações de parcelamento para cartão de crédito
        if (paymentMethod === 'credit_card') {
          (transactionData as any).installments = installments;
        }
      }

      console.log('Dados da transação:', transactionData);

      // Simulação de processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simular retorno baseado no método
      if (paymentMethod === 'pix') {
        // Simular QR Code do PIX
        setPixQrCode('00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913FULANO DE TAL6008BRASILIA62070503***63041D3D');
        alert('QR Code PIX gerado! (Demonstração - configure o backend para PIX real)');
      } else if (paymentMethod === 'boleto') {
        // Simular URL do boleto
        setBoletoUrl('https://api.pagar.me/transactions/123456/boleto');
        alert('Boleto gerado! (Demonstração - configure o backend para boleto real)');
      } else {
        alert('Pagamento processado com sucesso! (Demonstração - configure o backend para processar pagamentos reais)');
        clearCart();
        navigate('/');
      }
      
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  const paymentMethods = [
    {
      id: 'credit_card' as PaymentMethod,
      name: 'Cartão de Crédito',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      description: 'Parcelamento em até 12x'
    },
    {
      id: 'debit_card' as PaymentMethod,
      name: 'Cartão de Débito',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      description: 'Débito online'
    },
    {
      id: 'pix' as PaymentMethod,
      name: 'PIX',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Pagamento instantâneo'
    },
    {
      id: 'boleto' as PaymentMethod,
      name: 'Boleto Bancário',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      description: 'Vencimento em 3 dias'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Finalizar Compra
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulário de Checkout */}
            <div className="lg:col-span-2">
              <Cartao className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Dados do Cliente
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={customerData.phone}
                      onChange={handlePhoneChange}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      CPF/CNPJ *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={customerData.document}
                      onChange={handleDocumentChange}
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 mt-6">
                  Endereço
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rua *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={customerData.street}
                      onChange={(e) => setCustomerData({ ...customerData, street: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Número *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={customerData.streetNumber}
                      onChange={(e) => setCustomerData({ ...customerData, streetNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Bairro *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={customerData.neighborhood}
                      onChange={(e) => setCustomerData({ ...customerData, neighborhood: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      CEP *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={customerData.zipcode}
                      onChange={handleZipcodeChange}
                      placeholder="00000-000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      value={customerData.city}
                      onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Estado *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={2}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white uppercase"
                      value={customerData.state}
                      onChange={(e) => setCustomerData({ ...customerData, state: e.target.value.toUpperCase() })}
                      placeholder="SP"
                    />
                  </div>
                </div>
              </Cartao>

              {/* Seleção de Método de Pagamento */}
              <Cartao className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Método de Pagamento
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 border-2 rounded-lg transition-all duration-200 text-left ${
                        paymentMethod === method.id
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-300 dark:border-gray-700 hover:border-purple-400 bg-white dark:bg-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${paymentMethod === method.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`}>
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <div className={`font-semibold ${paymentMethod === method.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'}`}>
                            {method.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {method.description}
                          </div>
                        </div>
                        {paymentMethod === method.id && (
                          <div className="text-purple-600 dark:text-purple-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Formulário de Cartão (Crédito/Débito) */}
                  {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Dados do Cartão
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Número do Cartão *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={19}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            value={cardData.number}
                            onChange={handleCardNumberChange}
                            placeholder="0000 0000 0000 0000"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nome no Cartão *
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white uppercase"
                            value={cardData.holderName}
                            onChange={(e) => setCardData({ ...cardData, holderName: e.target.value.toUpperCase() })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Validade *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={5}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            value={cardData.expirationDate}
                            onChange={handleExpirationDateChange}
                            placeholder="MM/AA"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={4}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            value={cardData.cvv}
                            onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                            placeholder="000"
                          />
                        </div>
                      </div>
                      
                      {/* Opção de Parcelamento - Apenas para Cartão de Crédito */}
                      {paymentMethod === 'credit_card' && (
                        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Parcelamento *
                          </label>
                          <select
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            value={installments}
                            onChange={(e) => setInstallments(Number(e.target.value))}
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => {
                              const installmentValue = total / num;
                              return (
                                <option key={num} value={num}>
                                  {num}x de {formatPrice(installmentValue)} {num > 1 ? '(sem juros)' : ''}
                                </option>
                              );
                            })}
                          </select>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Total: {formatPrice(total)} em {installments}x de {formatPrice(total / installments)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Informações PIX */}
                  {paymentMethod === 'pix' && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                        <div className="flex justify-center mb-4">
                          <svg className="w-16 h-16 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          PIX - Pagamento Instantâneo
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Após finalizar a compra, você receberá o QR Code para pagamento instantâneo.
                        </p>
                        {pixQrCode && (
                          <div className="mt-4">
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg inline-block mb-4">
                              <div className="text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
                                {pixQrCode}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Escaneie o QR Code com o app do seu banco
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Informações Boleto */}
                  {paymentMethod === 'boleto' && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Boleto Bancário
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Após finalizar a compra, você receberá o boleto para pagamento. O boleto vence em 3 dias úteis.
                        </p>
                        {boletoUrl && (
                          <div className="mt-4">
                            <a
                              href={boletoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                              Baixar Boleto
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6 mb-6">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Importante:</strong> Esta é uma versão de demonstração. Para processar pagamentos reais, 
                      configure o backend com as chaves do Pagar.me. A chave secreta nunca deve estar no frontend.
                    </p>
                  </div>

                  <Botao
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Processando...' : paymentMethod === 'pix' ? `Gerar QR Code PIX - ${formatPrice(total)}` : paymentMethod === 'boleto' ? `Gerar Boleto - ${formatPrice(total)}` : `Pagar ${formatPrice(total)}`}
                  </Botao>
                </form>
              </Cartao>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <Cartao>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Resumo do Pedido
                </h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatPrice(item.price)} x {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm ml-2"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold mt-4">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-purple-600 dark:text-purple-400">{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                </div>
              </Cartao>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
