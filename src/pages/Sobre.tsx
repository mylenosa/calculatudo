import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Sobre() {
  useEffect(() => {
    document.title = 'Sobre o MyCalculadora';
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Sobre o MyCalculadora</h1>
      
      <div className="space-y-6 text-gray-700">
        <p className="text-lg">
          O MyCalculadora foi criado para ser uma ferramenta simples e confiável, reunindo diversas <strong className="font-semibold">calculadoras úteis para facilitar o seu dia a dia.</strong>
        </p>

        <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
          <p>
            Simples, rápido, confiável — e de graça.
          </p>
        </div>
        
        {/* --- INÍCIO DA MODIFICAÇÃO: ESTILO "BIO DE AUTOR" --- */}
        <div className="border-t pt-6 mt-8">
          <h2 className="text-2xl font-bold mb-3 text-blue-600">Desenvolvido por</h2>
          <p className="mb-2">
            <strong className="font-semibold">Mylena Viana Nunes</strong> — estudante de Análise e Desenvolvimento de Sistemas no Instituto Federal de Rondônia (IFRO).
          </p>
          <div className="flex space-x-4">
            <a 
              href="https://www.linkedin.com/in/mylena-viana-nunes/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/mylenosa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
        {/* --- FIM DA MODIFICAÇÃO --- */}

        <div>
          <h2 className="text-2xl font-bold mb-3 text-blue-600">Aviso Legal</h2>
          <p>
            Este projeto fornece <strong className="font-semibold">simulações baseadas em dados e fórmulas de conhecimento público</strong>, mas <strong className="font-semibold">não substitui</strong> a orientação de um profissional qualificado para casos específicos. Use os resultados como uma referência e sempre consulte um especialista para validação final.
          </p>
        </div>
        
        <div className="text-center pt-4">
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            &larr; Voltar para as calculadoras
          </Link>
        </div>
      </div>
    </div>
  );
}