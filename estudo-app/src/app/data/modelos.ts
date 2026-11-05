export interface Topico {
  id: string;
  titulo: string;
  /** Conteúdo em Markdown. */
  conteudo: string;
  /** Macetes curtos mostrados no bloco "Fixação" (vazio = sem bloco). Aceita Markdown inline. */
  fixacao: string[];
  /** Rótulo opcional do bloco, ex.: "números da LC 93". */
  fixacaoTitulo?: string;
}

export interface Questao {
  id: string;
  enunciado: string;
  alternativas: string[];
  /** Índice (0 = A) da alternativa correta. */
  correta: number;
  comentario: string;
}

export type Area = 'basicos' | 'gerais' | 'especificos';

export interface Disciplina {
  id: string;
  numero: string;
  nome: string;
  /** Versão curta para o menu lateral. */
  nomeCurto: string;
  icone: string;
  area: Area;
  /** Quantidade estimada de questões na prova (o edital fixa só o total por área). */
  questoesProva: number;
  /** Arquivo de origem do conteúdo na série de estudo. */
  arquivo: string;
}

/** Prioridade de estudo anotada no cabeçalho de cada .md. */
export type Peso = 'facil' | 'medio' | 'alto' | 'critico';

export const ROTULO_PESO: Record<Peso, string> = {
  facil: 'fácil',
  medio: 'médio',
  alto: 'alto',
  critico: 'crítico',
};

export interface ConteudoDisciplina {
  peso?: Peso;
  /** Texto de abertura (Markdown) mostrado antes dos tópicos. */
  intro?: string;
  topicos: Topico[];
  questoes: Questao[];
}

export const NOME_AREA: Record<Area, string> = {
  basicos: 'Conhecimentos Básicos',
  gerais: 'Conhecimentos Gerais',
  especificos: 'Conhecimentos Específicos',
};
