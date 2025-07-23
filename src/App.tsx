import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorBoundary/ErrorBoundary';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rescisao from './pages/calculadoras/Rescisao';
import SalarioLiquido from './pages/calculadoras/SalarioLiquido';
import Footer from './components/Footer';
import Sobre from './pages/Sobre';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rescisao" element={<Rescisao />} />
              <Route path="/salario-liquido" element={<SalarioLiquido />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;