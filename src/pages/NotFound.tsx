import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada | CalculaTudo';
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-8 text-center bg-white rounded shadow mt-6">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Página Não Encontrada</h2>
      <p className="text-gray-600 mb-6">
        Oops! A página que você está procurando não existe.
      </p>
      <Link 
        to="/" 
        className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700 transition"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
}