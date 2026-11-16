import { Injectable, computed, effect, signal } from '@angular/core';
import { DISCIPLINAS, conteudoDe } from '../data/disciplinas';

export type Tema = 'auto' | 'claro' | 'escuro';

/** Etapas do edital verticalizado: ler a aula, revisar e treinar com questões. */
export type Etapa = 'teoria' | 'revisao' | 'questoes';

export interface Resultado {
  acertos: number;
  total: number;
  /** Melhor nota (em acertos) já obtida no quiz completo. */
  melhor: number;
  data: string;
}

export interface SimuladoFeito {
  data: string;
  segundos: number;
  total: number;
  acertos: number;
  /** Nota projetada para a prova de 100 pontos (null se faltou alguma área). */
  nota: number | null;
  porDisciplina: Record<string, { acertos: number; total: number }>;
}

export interface Plano {
  /** Dia em que o plano começa (AAAA-MM-DD). */
  inicio: string;
  /** Aulas do plano, no formato "disciplina/topico". */
  aulas: string[];
}

interface Estado {
  /** Ids dos tópicos já estudados (teoria), por disciplina. */
  estudados: Record<string, string[]>;
  revisados: Record<string, string[]>;
  praticados: Record<string, string[]>;
  resultados: Record<string, Resultado>;
  simulados: SimuladoFeito[];
  /** Dias (AAAA-MM-DD) em que houve atividade de estudo. */
  dias: string[];
  plano: Plano | null;
  tema: Tema;
}

const CHAVE = 'estudo-cuiaba:v1';
const VAZIO: Estado = {
  estudados: {},
  revisados: {},
  praticados: {},
  resultados: {},
  simulados: [],
  dias: [],
  plano: null,
  tema: 'auto',
};

export const paraIso = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const doIso = (iso: string): Date => {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d);
};

/** Todas as aulas (tópicos) de todas as disciplinas, na ordem das apostilas. */
export const todasAsAulas = (): string[] =>
  DISCIPLINAS.flatMap((d) => (conteudoDe(d.id)?.topicos ?? []).map((t) => `${d.id}/${t.id}`));

/** Guarda o progresso no navegador (localStorage), sem precisar de servidor. */
@Injectable({ providedIn: 'root' })
export class ProgressoService {
  private readonly estado = signal<Estado>(this.carregar());

  readonly tema = () => this.estado().tema;
  readonly plano = computed(() => this.estado().plano as Plano);
  readonly simulados = computed(() => this.estado().simulados);

  /** Dias seguidos de estudo (conta de hoje ou de ontem para trás). */
  readonly sequencia = computed(() => {
    const dias = new Set(this.estado().dias);
    let dia = new Date();
    if (!dias.has(paraIso(dia))) dia.setDate(dia.getDate() - 1);
    let n = 0;
    while (dias.has(paraIso(dia))) {
      n++;
      dia = new Date(dia.getFullYear(), dia.getMonth(), dia.getDate() - 1);
    }
    return n;
  });

  readonly diasDeEstudo = computed(() => this.estado().dias.length);

  constructor() {
    effect(() => this.salvar(this.estado()));
  }

  // ------------------------------------------------------------ etapas por aula

  private lista(e: Estado, etapa: Etapa): Record<string, string[]> {
    return etapa === 'teoria' ? e.estudados : etapa === 'revisao' ? e.revisados : e.praticados;
  }

  marcado(etapa: Etapa, disciplina: string, topico: string): boolean {
    return this.lista(this.estado(), etapa)[disciplina]?.includes(topico) ?? false;
  }

  total(etapa: Etapa, disciplina: string): number {
    return this.lista(this.estado(), etapa)[disciplina]?.length ?? 0;
  }

  alternar(etapa: Etapa, disciplina: string, topico: string): void {
    this.estado.update((e) => {
      const lista = this.lista(e, etapa);
      const atuais = lista[disciplina] ?? [];
      const marcando = !atuais.includes(topico);
      const novos = marcando ? [...atuais, topico] : atuais.filter((t) => t !== topico);
      const campo = etapa === 'teoria' ? 'estudados' : etapa === 'revisao' ? 'revisados' : 'praticados';
      const proximo = { ...e, [campo]: { ...lista, [disciplina]: novos } };
      return marcando ? this.comAtividade(proximo) : proximo;
    });
  }

  estudado(disciplina: string, topico: string): boolean {
    return this.marcado('teoria', disciplina, topico);
  }

  totalEstudados(disciplina: string): number {
    return this.total('teoria', disciplina);
  }

  alternarEstudado(disciplina: string, topico: string): void {
    this.alternar('teoria', disciplina, topico);
  }

  // ------------------------------------------------------------ questões e simulados

  resultado(disciplina: string): Resultado | undefined {
    return this.estado().resultados[disciplina];
  }

  /** Registra o fim de uma rodada completa do quiz. */
  registrarResultado(disciplina: string, acertos: number, total: number): void {
    this.estado.update((e) => {
      const anterior = e.resultados[disciplina];
      const melhor = Math.max(acertos, anterior?.total === total ? anterior.melhor : 0);
      const resultado: Resultado = { acertos, total, melhor, data: new Date().toISOString() };
      return this.comAtividade({ ...e, resultados: { ...e.resultados, [disciplina]: resultado } });
    });
  }

  registrarSimulado(feito: SimuladoFeito): void {
    this.estado.update((e) => this.comAtividade({ ...e, simulados: [feito, ...e.simulados].slice(0, 50) }));
  }

  // ------------------------------------------------------------ plano e tema

  /** Recomeça o plano de hoje em diante, só com as aulas ainda não estudadas. */
  replanejar(): void {
    this.estado.update((e) => ({
      ...e,
      plano: {
        inicio: paraIso(new Date()),
        aulas: todasAsAulas().filter((c) => {
          const [d, t] = c.split('/');
          return !(e.estudados[d]?.includes(t) ?? false);
        }),
      },
    }));
  }

  definirTema(tema: Tema): void {
    this.estado.update((e) => ({ ...e, tema }));
  }

  // ------------------------------------------------------------ internos

  private comAtividade(e: Estado): Estado {
    const hoje = paraIso(new Date());
    return e.dias.includes(hoje) ? e : { ...e, dias: [...e.dias, hoje].slice(-400) };
  }

  private carregar(): Estado {
    let lido: Estado = VAZIO;
    try {
      const bruto = localStorage.getItem(CHAVE);
      if (bruto) lido = { ...VAZIO, ...(JSON.parse(bruto) as Partial<Estado>) };
    } catch {
      /* armazenamento indisponível ou corrompido */
    }
    return lido.plano
      ? lido
      : { ...lido, plano: { inicio: paraIso(new Date()), aulas: todasAsAulas() } };
  }

  private salvar(estado: Estado): void {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch {
      /* modo privado ou cota cheia: o progresso só não persiste */
    }
  }
}
