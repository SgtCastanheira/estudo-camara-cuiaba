import { Injectable, effect, signal } from '@angular/core';

export type Tema = 'auto' | 'claro' | 'escuro';

export interface Resultado {
  acertos: number;
  total: number;
  /** Melhor nota (em acertos) já obtida no quiz completo. */
  melhor: number;
  data: string;
}

interface Estado {
  /** Ids dos tópicos já estudados, por disciplina. */
  estudados: Record<string, string[]>;
  resultados: Record<string, Resultado>;
  tema: Tema;
}

const CHAVE = 'estudo-cuiaba:v1';
const VAZIO: Estado = { estudados: {}, resultados: {}, tema: 'auto' };

/** Guarda o progresso no navegador (localStorage), sem precisar de servidor. */
@Injectable({ providedIn: 'root' })
export class ProgressoService {
  private readonly estado = signal<Estado>(this.carregar());

  readonly tema = () => this.estado().tema;

  constructor() {
    effect(() => this.salvar(this.estado()));
  }

  estudado(disciplina: string, topico: string): boolean {
    return this.estado().estudados[disciplina]?.includes(topico) ?? false;
  }

  totalEstudados(disciplina: string): number {
    return this.estado().estudados[disciplina]?.length ?? 0;
  }

  alternarEstudado(disciplina: string, topico: string): void {
    this.estado.update((e) => {
      const atuais = e.estudados[disciplina] ?? [];
      const novos = atuais.includes(topico)
        ? atuais.filter((t) => t !== topico)
        : [...atuais, topico];
      return { ...e, estudados: { ...e.estudados, [disciplina]: novos } };
    });
  }

  resultado(disciplina: string): Resultado | undefined {
    return this.estado().resultados[disciplina];
  }

  /** Registra o fim de uma rodada completa do quiz. */
  registrarResultado(disciplina: string, acertos: number, total: number): void {
    this.estado.update((e) => {
      const anterior = e.resultados[disciplina];
      const melhor = Math.max(acertos, anterior?.total === total ? anterior.melhor : 0);
      const resultado: Resultado = { acertos, total, melhor, data: new Date().toISOString() };
      return { ...e, resultados: { ...e.resultados, [disciplina]: resultado } };
    });
  }

  definirTema(tema: Tema): void {
    this.estado.update((e) => ({ ...e, tema }));
  }

  private carregar(): Estado {
    try {
      const bruto = localStorage.getItem(CHAVE);
      return bruto ? { ...VAZIO, ...(JSON.parse(bruto) as Partial<Estado>) } : VAZIO;
    } catch {
      return VAZIO; // armazenamento indisponível ou corrompido
    }
  }

  private salvar(estado: Estado): void {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch {
      /* modo privado ou cota cheia: o progresso só não persiste */
    }
  }
}
