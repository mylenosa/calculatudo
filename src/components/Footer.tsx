import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto text-sm text-gray-500 text-center py-4">
      <div className="space-x-4 mb-2">
        <Link to="/" className="hover:text-blue-600">Início</Link>
        <Link to="/sobre" className="hover:text-blue-600">Sobre</Link>
      </div>
      <p>
        {/* --- MODIFICADO --- */}
        © {new Date().getFullYear()} MyCalculadora. Simulações com base em dados. Consulte um profissional para validação final.
      </p>
    </footer>
  );
}