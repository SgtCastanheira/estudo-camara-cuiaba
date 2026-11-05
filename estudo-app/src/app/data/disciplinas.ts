import { CONTEUDO_GERADO } from './conteudo.gerado';
import { Area, ConteudoDisciplina, Disciplina } from './modelos';

/** Data da prova objetiva (Edital nº 001/2026-CMC). */
export const DATA_PROVA = new Date(2026, 11, 13); // 13/12/2026

/** Pontos e questões por área, conforme a estrutura da prova. */
export const AREAS: { id: Area; nome: string; questoes: number; peso: string }[] = [
  { id: 'basicos', nome: 'Conhecimentos Básicos', questoes: 15, peso: '1 ponto cada' },
  { id: 'gerais', nome: 'Conhecimentos Gerais', questoes: 15, peso: '1 ponto cada' },
  { id: 'especificos', nome: 'Conhecimentos Específicos', questoes: 40, peso: '1,75 ponto cada' },
];

export const DISCIPLINAS: Disciplina[] = [
  { id: 'portugues', numero: '01', nome: 'Língua Portuguesa', nomeCurto: 'Língua Portuguesa', icone: 'menu_book', area: 'basicos', questoesProva: 5, arquivo: '01-portugues.md' },
  { id: 'rlm', numero: '02', nome: 'Raciocínio Lógico e Matemático', nomeCurto: 'Raciocínio Lógico', icone: 'calculate', area: 'basicos', questoesProva: 5, arquivo: '02-rlm.md' },
  { id: 'informatica', numero: '03', nome: 'Noções de Informática', nomeCurto: 'Informática', icone: 'computer', area: 'basicos', questoesProva: 5, arquivo: '03-informatica.md' },
  { id: 'mato-grosso', numero: '04', nome: 'História e Geografia de Mato Grosso', nomeCurto: 'História e Geografia de MT', icone: 'public', area: 'gerais', questoesProva: 4, arquivo: '04-mato-grosso.md' },
  { id: 'etica', numero: '05', nome: 'Noções de Ética e Filosofia', nomeCurto: 'Ética e Filosofia', icone: 'psychology', area: 'gerais', questoesProva: 4, arquivo: '05-etica.md' },
  { id: 'relacoes', numero: '06', nome: 'Relações Interpessoais', nomeCurto: 'Relações Interpessoais', icone: 'groups', area: 'gerais', questoesProva: 3, arquivo: '06-relacoes.md' },
  { id: 'adm-publica', numero: '07', nome: 'Noções de Administração Pública', nomeCurto: 'Administração Pública', icone: 'account_balance', area: 'gerais', questoesProva: 4, arquivo: '07-adm-publica.md' },
  { id: 'legislacao', numero: '08', nome: 'Legislação Municipal', nomeCurto: 'Legislação Municipal', icone: 'gavel', area: 'especificos', questoesProva: 10, arquivo: '08-legislacao.md' },
  { id: 'ti', numero: '09', nome: 'Conhecimentos Específicos de TI', nomeCurto: 'Específicos de TI', icone: 'terminal', area: 'especificos', questoesProva: 30, arquivo: '09-ti.md' },
];

/**
 * Disciplinas com conteúdo: todas vêm dos .md da pasta "2° parte" via `npm run conteudo`
 * (conteudo.gerado.ts). O id da disciplina é o "slug" do cabeçalho do .md.
 */
const CONTEUDOS: Record<string, ConteudoDisciplina> = CONTEUDO_GERADO;

export function conteudoDe(id: string): ConteudoDisciplina | undefined {
  return CONTEUDOS[id];
}

export function disciplinaPorId(id: string): Disciplina | undefined {
  return DISCIPLINAS.find((d) => d.id === id);
}

export function disciplinasDaArea(area: Area): Disciplina[] {
  return DISCIPLINAS.filter((d) => d.area === area);
}
