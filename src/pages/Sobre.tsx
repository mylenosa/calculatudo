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
        
        <div className="border-t pt-6 mt-8">
          <h2 className="text-2xl font-bold mb-3 text-blue-600">Desenvolvido por</h2>
          <p className="mb-3">
            <strong className="font-semibold">Mylena Viana Nunes</strong> — uma estudante de Análise e Desenvolvimento de Sistemas que gosta de craftar ferramentas úteis para o seu inventário do dia a dia.
          </p>
                    
          <div className="flex space-x-4 items-center">
            <a 
              href="https://www.linkedin.com/in/seu-usuario-linkedin" // Lembre-se de colocar seu link
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition duration-200"
<<<<<<< HEAD
              aria-label="LinkedIn de Mylena Viana Nunes" 
=======
              aria-label="LinkedIn de Mylena Viana Nunes" // Essencial para acessibilidade
>>>>>>> 8771898 (style: Alinha ícones e texto dos links de perfil)
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-4.481 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
              </svg>
            </a>
            <a 
              href="https://github.com/mylenosa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition duration-200"
<<<<<<< HEAD
              aria-label="GitHub de Mylena Viana Nunes" 
=======
              aria-label="GitHub de Mylena Viana Nunes" // Essencial para acessibilidade
>>>>>>> 8771898 (style: Alinha ícones e texto dos links de perfil)
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

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