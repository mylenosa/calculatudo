import React, { useState, useEffect } from 'react';
import Tooltip from '../../components/Tooltip';
import { calcularRescisaoReal } from '../../utils/calculoRescisao';
import { NumericFormat } from 'react-number-format'; 

export default function Rescisao() {
  const [salario, setSalario] = useState<number | undefined>(undefined);

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Cálculo de Rescisão CLT</h1>
        <p className="mb-6 text-gray-700">
          Preencha os dados abaixo para estimar o valor da sua rescisão trabalhista.
        </p>
        <div className="space-y-5">
          <div>
            <label htmlFor="salario-bruto" className="block font-medium">
              Salário bruto
              <Tooltip message="Salário mensal registrado na carteira de trabalho." />
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 px-3 py-2 rounded-l text-gray-600">R$</span>
              <NumericFormat
                id="salario-bruto"
                className="border rounded-r px-3 py-2 w-full"
                placeholder="Ex: 2.500,00"
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
          {/* ... (o resto do formulário e da página continua o mesmo) ... */}
        </div>
      </div>
    </>
  );
}