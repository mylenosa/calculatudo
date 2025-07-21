import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rescisao from './pages/calculadoras/Rescisao';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rescisao" element={<Rescisao />} />
      </Routes>
      <Footer />
    </Router>
  );
}
