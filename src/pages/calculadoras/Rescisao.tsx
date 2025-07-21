import React, { useState } from 'react';
import Tooltip from '../../components/Tooltip';
import { calcularRescisaoReal } from '../../utils/calculoRescisao';

export default function Rescisao() {
  const [salario, setSalario] = useState('');
  const [admissao, setAdmissao] = useState('');
  const [saida, setSaida] = useState('');
  const [aviso, setAviso] = useState('');
  const [feriasVencidas, setFeriasVencidas] = useState<boolean | null>(null);
  const [motivo, setMotivo] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const formatarReal = (valor: number) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const calcular = () => {
    if (!salario || !admissao || !saida || !motivo || feriasVencidas === null) return;

    const salarioNum = parseFloat(salario);
    if (isNaN(salarioNum)) return;

    const total = calcularRescisaoReal({
      salario: salarioNum,
      dataAdmissao: admissao,
      dataSaida: saida,
      motivo,
      aviso,
      feriasVencidas,
    });

    setResultado(total);
  };

  const getMesesTrabalhados = () => {
    if (!admissao || !saida) return 0;
    const adm = new Date(admissao);
    const sai = new Date(saida);
    return (sai.getFullYear() - adm.getFullYear()) * 12 + (sai.getMonth() - adm.getMonth());
  };

  const menosDe12Meses = getMesesTrabalhados() < 12;

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Cálculo de Rescisão CLT</h1>

        <p className="mb-6 text-gray-700">
          Preencha os dados abaixo para estimar o valor da sua rescisão trabalhista.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block font-medium">
              Salário bruto
              <Tooltip message="Salário mensal registrado na carteira de trabalho, sem considerar descontos ou adicionais." />
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 px-3 py-2 rounded-l text-gray-600">R$</span>
              <input
                type="number"
                className="border rounded-r px-3 py-2 w-full"
                placeholder="Ex: 2500"
                value={salario}
                onChange={e => setSalario(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium">
                Data de admissão
                <Tooltip message="Data em que você começou oficialmente a trabalhar na empresa." />
              </label>
              <input
                type="date"
                className="border rounded px-3 py-2 w-full"
                value={admissao}
                onChange={e => setAdmissao(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium">
                Data de saída
                <Tooltip message="Último dia de vínculo com a empresa, incluindo aviso prévio." />
              </label>
              <input
                type="date"
                className="border rounded px-3 py-2 w-full"
                value={saida}
                onChange={e => setSaida(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">
              Tipo de aviso prévio
              <Tooltip message="O aviso prévio pode ser trabalhado, indenizado (pago sem trabalhar) ou dispensado." />
            </label>
            <select
              className="border rounded px-3 py-2 w-full appearance-none pr-8"
              value={aviso}
              onChange={e => setAviso(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="indenizado">Indenizado</option>
              <option value="trabalhado">Trabalhado</option>
              <option value="dispensado">Dispensado</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">
              Motivo da saída
              <Tooltip message="Se foi pedido de demissão, demissão sem justa causa ou por justa causa." />
            </label>
            <select
              className="border rounded px-3 py-2 w-full appearance-none pr-8"
              value={motivo}
              onChange={e => setMotivo(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="sem_justa_causa">Demissão sem justa causa</option>
              <option value="pedido_demissao">Pedido de demissão</option>
              <option value="justa_causa">Justa causa</option>
            </select>
          </div>

          {!menosDe12Meses && (
            <div>
              <label className="block font-medium mb-1">
                Possui férias vencidas?
                <Tooltip message="Você já completou 12 meses de trabalho e ainda não tirou férias?" />
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={feriasVencidas === true}
                    onChange={() => setFeriasVencidas(true)}
                  />
                  Sim
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={feriasVencidas === false}
                    onChange={() => setFeriasVencidas(false)}
                  />
                  Não
                </label>
              </div>
            </div>
          )}

          <button
            onClick={calcular}
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded"
          >
            Calcular rescisão
          </button>

          {resultado && (
            <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 text-blue-900 p-4 rounded">
              <p className="font-medium mb-2">Resultado estimado:</p>
              <ul className="text-sm mb-3 space-y-1">
                <li>🔹 Saldo de salário: <strong>{formatarReal(resultado.saldoSalario)}</strong></li>
                <li>🔹 Aviso prévio: <strong>{formatarReal(resultado.avisoPrevio)}</strong></li>
                <li>🔹 13º proporcional: <strong>{formatarReal(resultado.decimoTerceiro)}</strong></li>
                <li>🔹 Férias proporcionais: <strong>{formatarReal(resultado.feriasProporcionais)}</strong></li>
                <li>🔹 1/3 de férias: <strong>{formatarReal(resultado.umTercoFerias)}</strong></li>
                {resultado.feriasVencidas > 0 && (
                  <li>🔹 Férias vencidas: <strong>{formatarReal(resultado.feriasVencidas)}</strong></li>
                )}
                {resultado.multaFgts > 0 && (
                  <li>🔹 Multa de 40% do FGTS: <strong>{formatarReal(resultado.multaFgts)}</strong></li>
                )}
              </ul>

              <p className="text-xl font-bold">
                Total estimado: {formatarReal(resultado.total)}
              </p>

              <p className="text-xs text-gray-600 mt-2">
                Este valor é uma simulação com base na CLT. Consulte um contador para casos específicos.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
