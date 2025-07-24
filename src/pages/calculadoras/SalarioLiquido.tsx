import React, { useState, useEffect } from 'react';
import Tooltip from '../../components/Tooltip';
import { calcularSalario } from '../../utils/calculoSalario';
import { NumericFormat } from 'react-number-format'; 

export default function SalarioLiquido() {
  useEffect(() => {
    document.title = 'Calculadora de Salário Líquido | MyCalculadora';
  }, []);

  const [salario, setSalario] = useState<number | undefined>(undefined);
  const [dependentes, setDependentes] = useState('0');
  const [descontos, setDescontos] = useState<number | undefined>(undefined);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');

  const handleClear = () => {
    setSalario(undefined);
    setDependentes('0');
    setDescontos(undefined);
    setResultado(null);
    setErro('');
  };

  const calcular = () => {
    if (!salario) {
      setErro('O campo "Salário bruto" é obrigatório.');
      setResultado(null);
      return;
    }
    
    setErro('');

    const res = calcularSalario({
      salario: salario || 0,
      dependentes: parseInt(dependentes || '0'),
      descontos: descontos || 0,
    });

    setResultado(res);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Cálculo de Salário Líquido</h1>
      <p className="mb-6 text-gray-700">
        Preencha os campos abaixo para estimar o valor do seu salário líquido mensal.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div className="sm:col-span-2">
          <label htmlFor="salario-bruto-sl" className="block font-medium">
            Salário bruto
            <Tooltip message="Salário mensal registrado na carteira de trabalho." />
          </label>
          <div className="flex items-center">
            <span className="bg-gray-100 px-3 py-2 rounded-l text-gray-600">R$</span>
            <NumericFormat
              id="salario-bruto-sl"
              className="border rounded-r px-3 py-2 w-full"
              placeholder="Ex: 3.000,00"
              thousandSeparator="."
              decimalSeparator=","
              prefix=""
              decimalScale={2}
              fixedDecimalScale
              value={salario}
              onValueChange={(values) => setSalario(values.floatValue)}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="dependentes-sl" className="block font-medium">
            Número de dependentes
            <Tooltip message="Quantidade de dependentes legais para o cálculo do IRRF." />
          </label>
          <input
            id="dependentes-sl"
            type="number"
            min="0"
            className="border rounded px-3 py-2 w-full"
            placeholder="Ex: 2"
            value={dependentes}
            onChange={e => setDependentes(e.target.value)}
          />
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <p className="font-medium text-gray-800 mb-2">Possui descontos mensais?</p>
        <div>
          <label htmlFor="outros-descontos-sl" className="block font-medium">
            Outros descontos
            <Tooltip message="Soma de descontos como Vale-Transporte, plano de saúde, etc." />
          </label>
          <div className="flex items-center">
            <span className="bg-gray-100 px-3 py-2 rounded-l text-gray-600">R$</span>
            <NumericFormat
              id="outros-descontos-sl"
              className="border rounded-r px-3 py-2 w-full"
              placeholder="Ex: 400,00"
              thousandSeparator="."
              decimalSeparator=","
              prefix=""
              decimalScale={2}
              fixedDecimalScale
              value={descontos}
              onValueChange={(values) => setDescontos(values.floatValue)}
            />
          </div>
        </div>
      </div>
      
      {erro && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mt-6">
          <p>{erro}</p>
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={calcular}
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded w-full sm:w-auto"
        >
          Calcular salário líquido
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded w-full sm:w-auto"
        >
          Limpar
        </button>
      </div>

      {resultado && (
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 text-blue-900 p-4 rounded">
          <p className="font-medium mb-2">Resultado estimado:</p>
          <ul className="text-sm mb-2 space-y-1">
            <li>🔹 INSS: <strong>R$ {resultado.inss.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></li>
            <li>🔹 IRRF: <strong>R$ {resultado.irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong></li>
          </ul>
          <p className="text-lg font-bold">
            Salário líquido: R$ {resultado.liquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Esta é uma simulação baseada nas regras atuais (tabelas INSS/IRRF de 2025). Consulte um contador para casos específicos.
          </p>
        </div>
      )}
    </div>
  );
}