import React from 'react';
import { Link } from 'react-router-dom';

export function ErrorFallback() {
  return (
    <div className="max-w-3xl mx-auto p-8 text-center bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Algo deu errado.</h1>
      <p className="text-gray-600 mb-6">
        Um erro inesperado aconteceu. Por favor, tente recarregar a página ou voltar ao início.
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