
export interface CalculoInput {
  salario: number;
  dependentes: number;
  descontos: number;
}

export interface CalculoResultado {
  inss: number;
  irrf: number;
  liquido: number;
}

export function calcularSalario({ salario, dependentes, descontos }: CalculoInput): CalculoResultado {
  // INSS 2025 - progressivo
  const inssFaixas = [
    { teto: 1518.00, aliquota: 0.075 },
    { teto: 2793.88, aliquota: 0.09 },
    { teto: 4190.83, aliquota: 0.12 },
    { teto: 8157.41, aliquota: 0.14 },
  ];

  let inss = 0;
  let base = salario;
  let limiteAnterior = 0;

  for (const faixa of inssFaixas) {
    if (salario > limiteAnterior) {
      const faixaBase = Math.min(salario, faixa.teto) - limiteAnterior;
      inss += faixaBase * faixa.aliquota;
      limiteAnterior = faixa.teto;
    }
  }

  if (salario > 8157.41) {
    inss = 951.62; // teto fixo de 2025
  }

  // Base IRRF
  const baseIRRF = salario - inss - (dependentes * 189.59);

  const irrfFaixas = [
    { teto: 2428.80, aliquota: 0.0, deducao: 0 },
    { teto: 2826.65, aliquota: 0.075, deducao: 142.80 },
    { teto: 3751.05, aliquota: 0.15, deducao: 354.80 },
    { teto: 4664.68, aliquota: 0.225, deducao: 636.13 },
    { teto: Infinity, aliquota: 0.275, deducao: 869.36 },
  ];

  let irrf = 0;
  for (const faixa of irrfFaixas) {
    if (baseIRRF <= faixa.teto) {
      irrf = baseIRRF * faixa.aliquota - faixa.deducao;
      if (irrf < 0) irrf = 0;
      break;
    }
  }

  const liquido = salario - inss - irrf - descontos;

  return {
    inss: parseFloat(inss.toFixed(2)),
    irrf: parseFloat(irrf.toFixed(2)),
    liquido: parseFloat(liquido.toFixed(2))
  };
}
