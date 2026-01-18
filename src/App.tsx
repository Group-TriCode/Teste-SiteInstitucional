import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import { CartProvider } from './Context/CartContext';
import Cabecalho from './Components/Cabecalho';
import Rodape from './Components/Rodape';
import RolarParaTopo from './Components/RolarParaTopo';
import Home from './Routes/Home';
import Sobre from './Routes/Sobre';
import FAQ from './Routes/FAQ';
import Contato from './Routes/Contato';
import Produtos from './Routes/Produtos';
import Checkout from './Routes/Checkout';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <RolarParaTopo />
          <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300">
            <Cabecalho />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Rodape />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
