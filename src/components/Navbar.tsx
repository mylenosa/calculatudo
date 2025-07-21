import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-700 hover:opacity-80 transition">
          CalculaTudo
        </Link>
        <span className="text-sm text-gray-400">Simule cálculos confiáveis em segundos</span>
      </div>
    </nav>
  );
}
