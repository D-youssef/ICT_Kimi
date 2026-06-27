import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Overview from './pages/Overview';
import FVGPage from './pages/FVGPage';
import CISDPage from './pages/CISDPage';
import FibonacciPage from './pages/FibonacciPage';
import OrderBlockPage from './pages/OrderBlockPage';
import CandlePatterns from './pages/CandlePatterns';
import Checklist from './pages/Checklist';
import Sessions from './pages/Sessions';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col glow-bg">
        <Navbar />
        <main className="flex-grow z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/fvg" element={<FVGPage />} />
            <Route path="/cisd" element={<CISDPage />} />
            <Route path="/fibonacci" element={<FibonacciPage />} />
            <Route path="/orderblock" element={<OrderBlockPage />} />
            <Route path="/patterns" element={<CandlePatterns />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/sessions" element={<Sessions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
