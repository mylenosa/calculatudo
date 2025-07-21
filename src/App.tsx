import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rescisao from './pages/calculadoras/Rescisao';
import SalarioLiquido from './pages/calculadoras/SalarioLiquido';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rescisao" element={<Rescisao />} />
            <Route path="/salario-liquido" element={<SalarioLiquido />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
