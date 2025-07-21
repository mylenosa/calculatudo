import React, { useState } from 'react';
import Tooltip from '../../components/Tooltip';
import { calcularRescisaoReal, ResultadoDetalhado } from '../../utils/calculoRescisao';

export default function Rescisao() {
  const [salario, setSalario] = useState('');
  const [admissao, setAdmissao] = useState('');
  const [saida, setSaida] = useState('');
  const [aviso, setAviso] = useState('');
  const [feriasVencidas, setFeriasVencidas] = useState<boolean | null>(null);
  const [motivo, setMotivo] = useState('');
  const [resultado, setResultado] = useState<ResultadoDetalhado | null>(null);
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  function temDireitoAFeriasVencidas(dataAdmissao: string, dataSaida: string): boolean {
    if (!dataAdmissao || !dataSaida) return false;
    const adm = new Date(dataAdmissao);
    const sai = new Date(dataSaida);
    const diff = sai.getTime() - adm.getTime();
    return diff >= 365 * 24 * 60 * 60 * 1000;
  }

  const calcular = () => {
    const novosErros: { [key: string]: string } = {};

    if (!salario) novosErros.salario = 'Informe o salário bruto.';
    if (!admissao) novosErros.admissao = 'Informe a data de admissão.';
    if (!saida) novosErros.saida = 'Informe a data de saída.';
    if (!motivo) novosErros.motivo = 'Selecione o motivo da saída.';
    if (!aviso) novosErros.aviso = 'Selecione o tipo de aviso prévio.';
    if (feriasVencidas === null && temDireitoAFeriasVencidas(admissao, saida)) {
      novosErros.feriasVencidas = 'Informe se possui férias vencidas.';
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setErros({});
    const salarioNum = parseFloat(salario);
    if (isNaN(salarioNum)) return;

    const total = calcularRescisaoReal({
      salario: salarioNum,
      dataAdmissao: admissao,
      dataSaida: saida,
      motivo,
      aviso,
      feriasVencidas: feriasVencidas || false,
    });

    setResultado(total);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Cálculo de Rescisão CLT</h1>
      <p className="mb-6 text-gray-700">
        Preencha os dados abaixo para estimar o valor da sua rescisão trabalhista.
      </p>

      <div className="grid gap-4">
        {/* Salário */}
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
          {erros.salario && <p className="text-red-500 text-sm">{erros.salario}</p>}
        </div>

        {/* Admissão */}
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
          {erros.admissao && <p className="text-red-500 text-sm">{erros.admissao}</p>}
        </div>

        {/* Saída */}
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
          {erros.saida && <p className="text-red-500 text-sm">{erros.saida}</p>}
        </div>

        {/* Aviso prévio */}
        <div>
          <label className="block font-medium">
            Tipo de aviso prévio
            <Tooltip message="O aviso prévio pode ser trabalhado, indenizado (pago sem trabalhar) ou dispensado." />
          </label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={aviso}
            onChange={e => setAviso(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="indenizado">Indenizado</option>
            <option value="trabalhado">Trabalhado</option>
            <option value="dispensado">Dispensado</option>
          </select>
          {erros.aviso && <p className="text-red-500 text-sm">{erros.aviso}</p>}
        </div>

        {/* Motivo */}
        <div>
          <label className="block font-medium">
            Motivo da saída
            <Tooltip message="Se foi pedido de demissão, demissão sem justa causa ou por justa causa." />
          </label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="sem_justa_causa">Demissão sem justa causa</option>
            <option value="pedido_demissao">Pedido de demissão</option>
            <option value="justa_causa">Justa causa</option>
          </select>
          {erros.motivo && <p className="text-red-500 text-sm">{erros.motivo}</p>}
        </div>

        {/* Férias vencidas */}
        <div>
          <label className="block font-medium">
            Possui férias vencidas?
            <Tooltip message="Você já completou 12 meses de trabalho e ainda não tirou férias?" />
          </label>
          <div className="flex gap-4 mt-2">
            <label className={`flex items-center gap-2 ${!temDireitoAFeriasVencidas(admissao, saida) ? 'opacity-50' : ''}`}>
              <input
                type="radio"
                name="ferias"
                value="sim"
                disabled={!temDireitoAFeriasVencidas(admissao, saida)}
                checked={feriasVencidas === true}
                onChange={() => setFeriasVencidas(true)}
              />
              Sim
            </label>

            <label className={`flex items-center gap-2 ${!temDireitoAFeriasVencidas(admissao, saida) ? 'opacity-50' : ''}`}>
              <input
                type="radio"
                name="ferias"
                value="nao"
                disabled={!temDireitoAFeriasVencidas(admissao, saida)}
                checked={feriasVencidas === false}
                onChange={() => setFeriasVencidas(false)}
              />
              Não
            </label>
          </div>
          {erros.feriasVencidas && <p className="text-red-500 text-sm">{erros.feriasVencidas}</p>}
          {admissao && saida && !temDireitoAFeriasVencidas(admissao, saida) && (
            <p className="text-sm text-yellow-600 mt-1">
              ⚠️ Pelo tempo informado, você ainda não tem direito a férias vencidas.
            </p>
          )}
        </div>

        <button
          onClick={calcular}
          className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded mt-4 w-full"
        >
          Calcular rescisão
        </button>

        {resultado && (
          <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 text-blue-900 p-4 rounded">
            <p className="font-medium mb-2">Resultado estimado:</p>
            <ul className="text-sm mb-3 space-y-1">
              <li>🔹 Saldo de salário: <strong>R$ {resultado.saldoSalario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></li>
              <li>🔹 Aviso prévio: <strong>R$ {resultado.avisoPrevio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></li>
              <li>🔹 13º proporcional: <strong>R$ {resultado.decimoTerceiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></li>
              <li>🔹 Férias proporcionais: <strong>R$ {resultado.feriasProporcionais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></li>
              <li>🔹 1/3 de férias: <strong>R$ {resultado.umTercoFerias.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></li>
              {resultado.feriasVencidas > 0 && (
                <li>🔹 Férias vencidas: <strong>R$ {resultado.feriasVencidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></li>
              )}
              {resultado.multaFgts > 0 && (
                <li>🔹 Multa de 40% do FGTS: <strong>R$ {resultado.multaFgts.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></li>
              )}
            </ul>
            <p className="text-xl font-bold">
              Total estimado: {resultado.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Este valor é uma simulação com base na CLT. Consulte um contador para casos específicos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
