import { DATA_PROVA, conteudoDe, disciplinaPorId, tituloLimpo } from './disciplinas';

/** Ordem de prioridade e "cota" de aulas por rodada no ciclo de estudos (quanto maior, mais cedo e mais vezes). */
const CICLO: { id: string; cota: number }[] = [
  { id: 'ti', cota: 3 },
  { id: 'legislacao', cota: 2 },
  { id: 'informatica', cota: 1 },
  { id: 'rlm', cota: 1 },
  { id: 'portugues', cota: 1 },
  { id: 'adm-publica', cota: 1 },
  { id: 'mato-grosso', cota: 1 },
  { id: 'etica', cota: 1 },
  { id: 'relacoes', cota: 1 },
];

export interface AulaPlano {
  chave: string;
  disciplina: string;
  disciplinaNome: string;
  icone: string;
  topico: string;
  titulo: string;
}

export type TipoDia = 'estudo' | 'revisao' | 'simulado' | 'prova';

export interface DiaPlano {
  data: Date;
  tipo: TipoDia;
  titulo: string;
  descricao: string;
  aulas: AulaPlano[];
  /** Disciplinas que merecem questões neste dia. */
  treinar: string[];
}

const DIA_MS = 24 * 60 * 60 * 1000;
const meiaNoite = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const somarDias = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

function aula(chave: string): AulaPlano | undefined {
  const [disc, top] = chave.split('/');
  const d = disciplinaPorId(disc);
  const t = conteudoDe(disc)?.topicos.find((x) => x.id === top);
  return d && t
    ? { chave, disciplina: d.id, disciplinaNome: d.nomeCurto, icone: d.icone, topico: t.id, titulo: tituloLimpo(t.titulo) }
    : undefined;
}

/** Intercala as disciplinas em rodadas ponderadas (ciclo de estudos), mantendo a ordem de cada apostila. */
function sequenciaDeAulas(chaves: string[]): AulaPlano[] {
  const filas = new Map<string, AulaPlano[]>();
  for (const c of chaves) {
    const a = aula(c);
    if (a) filas.set(a.disciplina, [...(filas.get(a.disciplina) ?? []), a]);
  }
  const saida: AulaPlano[] = [];
  while ([...filas.values()].some((f) => f.length)) {
    for (const { id, cota } of CICLO) {
      const fila = filas.get(id);
      if (fila?.length) saida.push(...fila.splice(0, cota));
    }
  }
  return saida;
}

/**
 * Monta o cronograma do dia `inicio` até a prova: aulas distribuídas nos dias de estudo,
 * domingos de revisão e a reta final (revisão, simulado completo e descanso).
 */
export function gerarCronograma(inicio: Date, chaves: string[], prova: Date = DATA_PROVA): DiaPlano[] {
  const ini = meiaNoite(inicio);
  const fim = meiaNoite(prova);
  const n = Math.max(1, Math.round((fim.getTime() - ini.getTime()) / DIA_MS) + 1);

  const dias: DiaPlano[] = Array.from({ length: n }, (_, i) => {
    const data = somarDias(ini, i);
    const faltam = n - 1 - i;
    const base = { data, aulas: [] as AulaPlano[], treinar: [] as string[] };
    if (faltam === 0) {
      return { ...base, tipo: 'prova', titulo: 'Dia da prova', descricao: 'Boa sorte! Chegue cedo e leve documento e caneta.' };
    }
    if (faltam === 1) {
      return { ...base, tipo: 'revisao', titulo: 'Revisão leve e descanso', descricao: 'Releia só os macetes (Fixação). Durma bem.', treinar: ['ti'] };
    }
    if (faltam === 2) {
      return { ...base, tipo: 'simulado', titulo: 'Simulado completo', descricao: 'Faça um simulado de 40 questões ou mais e corrija os erros.', treinar: [] };
    }
    if (faltam === 3) {
      return { ...base, tipo: 'revisao', titulo: 'Revisão geral', descricao: 'Revise os macetes de TI e Legislação e refaça as questões erradas.', treinar: ['ti', 'legislacao'] };
    }
    if (data.getDay() === 0) {
      return { ...base, tipo: 'revisao', titulo: 'Revisão da semana', descricao: 'Releia os macetes da semana e faça um simulado curto.', treinar: [] };
    }
    return { ...base, tipo: 'estudo', titulo: 'Aulas do dia', descricao: '' };
  });

  let estudo = dias.filter((d) => d.tipo === 'estudo');
  if (!estudo.length) {
    dias[0].tipo = 'estudo';
    dias[0].titulo = 'Aulas do dia';
    dias[0].descricao = '';
    estudo = [dias[0]];
  }

  const seq = sequenciaDeAulas(chaves);
  const porDia = Math.ceil(seq.length / estudo.length) || 1;
  estudo.forEach((d, i) => {
    d.aulas = seq.slice(i * porDia, (i + 1) * porDia);
    d.treinar = [...new Set(d.aulas.map((a) => a.disciplina))].slice(0, 2);
    if (!d.aulas.length) {
      d.tipo = 'revisao';
      d.titulo = 'Revisão livre';
      d.descricao = 'Sem aulas novas: revise o que estudou e resolva questões.';
    }
  });
  return dias;
}

export const ROTULO_DIA: Record<TipoDia, string> = {
  estudo: 'Estudo',
  revisao: 'Revisão',
  simulado: 'Simulado',
  prova: 'Prova',
};
export const PRIORIDADE = CICLO.map((c) => c.id);
