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

  const mesesTrabalhados = (saida.getFullYear() - admissao.getFullYear()) * 12 + (saida.getMonth() - admissao.getMonth());
  const diasNoMes = saida.getDate();

  const saldoSalario = (salario / 30) * diasNoMes;
  const avisoPrevio = aviso === 'indenizado' ? salario : 0;
  const decimoTerceiro = (salario / 12) * (mesesTrabalhados % 12);
  const feriasProporcionais = (salario / 12) * (mesesTrabalhados % 12);
  const umTercoFerias = feriasProporcionais / 3;
  const feriasVencidasValor = feriasVencidas ? salario + salario / 3 : 0;
  const fgtsDepositos = salario * 0.08 * mesesTrabalhados;
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
