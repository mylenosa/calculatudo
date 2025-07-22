export interface DadosRescisao {
  salario: number;
  dataAdmissao: string;
  dataSaida: string;
  motivo: string;
  aviso: string;
  feriasVencidas: boolean;
}

export interface ResultadoDetalhado {
  saldoSalario: number;
  avisoPrevio: number;
  decimoTerceiro: number;
  feriasProporcionais: number;
  umTercoFerias: number;
  feriasVencidas: number;
  multaFgts: number;
  total: number;
}

export function calcularRescisaoReal(dados: DadosRescisao): ResultadoDetalhado {
  const { salario, dataAdmissao, dataSaida, motivo, aviso, feriasVencidas } = dados;

  const admissao = new Date(dataAdmissao);
  const saida = new Date(dataSaida);

  const diasNoMesSaida = saida.getDate();
  const saldoSalario = (salario / 30) * diasNoMesSaida;

  // --- LÓGICA DE CÁLCULO DE MESES APERFEIÇOADA ---
  const diffTime = Math.abs(saida.getTime() - admissao.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const mesesTrabalhadosTotal = Math.floor(diffDays / 30); // Aproximação para o total de meses

  // Lógica para 13º e Férias Proporcionais (regra dos 15 dias)
  let mesesParaCalculo = (saida.getFullYear() - admissao.getFullYear()) * 12 + (saida.getMonth() - admissao.getMonth());
  if (diasNoMesSaida >= 15) {
    mesesParaCalculo += 1;
  }
  // --- FIM DA LÓGICA APERFEIÇOADA ---

  let avisoPrevio = 0;
  if (motivo === 'sem_justa_causa' && aviso === 'indenizado') {
    avisoPrevio = salario;
  } else if (motivo === 'pedido_demissao' && aviso === 'nao_cumprido') {
    avisoPrevio = -salario;
  }

  const decimoTerceiro = (salario / 12) * (saida.getMonth() + 1); // 13º é calculado sobre os meses do ano corrente
  const feriasProporcionais = (salario / 12) * (mesesParaCalculo % 12);
  const umTercoFerias = (feriasProporcionais / 3);
  const feriasVencidasValor = feriasVencidas ? (salario + salario / 3) : 0;
  const fgtsDepositos = salario * 0.08 * mesesTrabalhadosTotal;
  const multaFgts = motivo === 'sem_justa_causa' ? fgtsDepositos * 0.4 : 0;

  const total =
    saldoSalario +
    avisoPrevio +
    decimoTerceiro +
    feriasProporcionais +
    umTercoFerias +
    feriasVencidasValor +
    multaFgts;

  return {
    saldoSalario,
    avisoPrevio,
    decimoTerceiro,
    feriasProporcionais,
    umTercoFerias,
    feriasVencidas: feriasVencidasValor,
    multaFgts,
    total,
  };
}