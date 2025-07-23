import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    document.title = 'MyCalculadora | Calculadoras Úteis para o Dia a Dia';
  }, []);
  
  const calculadoras = [
    {
      nome: 'Rescisão CLT',
      rota: '/rescisao',
      descricao: 'Simule sua demissão ou pedido de demissão com base nas leis trabalhistas.'
    },
    {
      nome: 'Salário Líquido',
      rota: '/salario-liquido',
      descricao: 'Calcule seu salário líquido com base nas regras atualizadas de INSS e IRRF (2025).'
    },
    {
      nome: 'Em breve...',
      rota: '#',
      descricao: 'Nova calculadora chegando!'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Calculadoras disponíveis</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {calculadoras.map((calc, i) => (
          <Link
            key={i}
            to={calc.rota}
            className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition 
            ${calc.rota === '#' ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-50'}`}
          >
            <h2 className="font-semibold text-lg mb-1">{calc.nome}</h2>
            <p className="text-gray-700 text-sm">{calc.descricao}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}