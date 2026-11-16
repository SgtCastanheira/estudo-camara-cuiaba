import type { Area } from './modelos';

export interface QuestaoSim {
  disc: string;
  area: Area;
  id: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  comentario: string;
}

/** Pontos de cada área na prova de 100 pontos. */
export const PONTOS_AREA: Record<Area, number> = { basicos: 15, gerais: 15, especificos: 70 };
const ORDEM_AREA: Area[] = ['basicos', 'gerais', 'especificos'];

export interface ResultadoSim {
  acertos: number;
  total: number;
  porDisciplina: Record<string, { acertos: number; total: number }>;
  porArea: Record<Area, { acertos: number; total: number }>;
  /** Nota projetada de 0 a 100; null se alguma área ficou sem questões. */
  nota: number | null;
  /** Atingiria o mínimo (40 pontos) sem zerar nenhuma área? null se não dá para projetar. */
  aprovado: boolean | null;
}

function embaralhar<T>(lista: T[], aleatorio: () => number): T[] {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Sorteia `n` questões distribuídas entre as disciplinas na proporção de `peso`
 * (questões estimadas na prova). Devolve na ordem da prova: por área e disciplina.
 */
export function sortear(
  pool: QuestaoSim[],
  n: number,
  peso: Record<string, number>,
  aleatorio: () => number = Math.random,
): QuestaoSim[] {
  const grupos = new Map<string, QuestaoSim[]>();
  for (const q of pool) grupos.set(q.disc, [...(grupos.get(q.disc) ?? []), q]);
  const ids = [...grupos.keys()];
  const alvo = Math.min(n, pool.length);
  const somaPeso = ids.reduce((s, id) => s + (peso[id] ?? 1), 0);

  const cota = new Map<string, number>();
  const resto: { id: string; frac: number }[] = [];
  for (const id of ids) {
    const exato = (alvo * (peso[id] ?? 1)) / somaPeso;
    const base = Math.min(Math.floor(exato), grupos.get(id)!.length);
    cota.set(id, base);
    resto.push({ id, frac: exato - Math.floor(exato) });
  }
  let faltam = alvo - [...cota.values()].reduce((a, b) => a + b, 0);
  const porFracao = [...resto].sort((a, b) => b.frac - a.frac);
  while (faltam > 0) {
    let andou = false;
    for (const { id } of porFracao) {
      if (faltam > 0 && cota.get(id)! < grupos.get(id)!.length) {
        cota.set(id, cota.get(id)! + 1);
        faltam--;
        andou = true;
      }
    }
    if (!andou) break;
  }

  const escolhidas = ids.flatMap((id) => embaralhar(grupos.get(id)!, aleatorio).slice(0, cota.get(id)!));
  const ordemDisc = new Map(pool.map((q, i) => [q.disc, i]));
  return escolhidas.sort(
    (a, b) =>
      ORDEM_AREA.indexOf(a.area) - ORDEM_AREA.indexOf(b.area) ||
      (ordemDisc.get(a.disc) ?? 0) - (ordemDisc.get(b.disc) ?? 0),
  );
}

/** Corrige as respostas (índice da alternativa, ou null se em branco). */
export function corrigir(questoes: QuestaoSim[], respostas: (number | null)[]): ResultadoSim {
  const porDisciplina: ResultadoSim['porDisciplina'] = {};
  const porArea: ResultadoSim['porArea'] = {
    basicos: { acertos: 0, total: 0 },
    gerais: { acertos: 0, total: 0 },
    especificos: { acertos: 0, total: 0 },
  };
  let acertos = 0;
  questoes.forEach((q, i) => {
    const certa = respostas[i] === q.correta;
    if (certa) acertos++;
    const d = (porDisciplina[q.disc] ??= { acertos: 0, total: 0 });
    d.total++;
    porArea[q.area].total++;
    if (certa) {
      d.acertos++;
      porArea[q.area].acertos++;
    }
  });

  const completo = ORDEM_AREA.every((a) => porArea[a].total > 0);
  const nota = completo
    ? Math.round(ORDEM_AREA.reduce((s, a) => s + (porArea[a].acertos / porArea[a].total) * PONTOS_AREA[a], 0) * 10) / 10
    : null;
  const aprovado = nota === null ? null : nota >= 40 && ORDEM_AREA.every((a) => porArea[a].acertos > 0);
  return { acertos, total: questoes.length, porDisciplina, porArea, nota, aprovado };
}
