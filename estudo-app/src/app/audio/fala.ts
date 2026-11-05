/**
 * Prepara o conteúdo (Markdown) para ser lido em voz alta pela síntese de voz do aparelho.
 * Funções puras, sem Angular — testáveis com `npm run test:fala`.
 */

export interface ItemAudio {
  /** Identificador estável, ex.: "rlm:3-proposicoes-conectivos-e-tabela-verdade". */
  chave: string;
  /** Texto mostrado no player. */
  titulo: string;
  subtitulo: string;
  /** Texto já preparado para falar. */
  texto: string;
}

const SUBSCRITOS: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
};

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/** Símbolos que a voz não pronuncia (ou pronuncia mal) e seu equivalente falado. */
const SIMBOLOS: [RegExp, string][] = [
  [/⊻/g, ' ou exclusivo '],
  [/∧/g, ' e '],
  [/∨/g, ' ou '],
  [/↔/g, ' se e somente se '],
  [/≡/g, ' equivale a '],
  [/≈/g, ' aproximadamente '],
  [/≠/g, ' diferente de '],
  [/≤/g, ' menor ou igual a '],
  [/≥/g, ' maior ou igual a '],
  [/∪/g, ' união '],
  [/∩/g, ' interseção '],
  [/∀/g, ' para todo '],
  [/∃/g, ' existe '],
  [/×/g, ' vezes '],
  [/÷/g, ' dividido por '],
  [/−/g, ' menos '],
  [/\^/g, ' elevado a '],
  [/~/g, ' não '],
  [/\+/g, ' mais '],
  [/&/g, ' e '],
  [/(?<=[\p{L}\d)])·(?=[\p{L}\d(])/gu, ' vezes '],
];

/** Abreviações e siglas que a voz lê mal. */
const ABREVIACOES: [RegExp, string][] = [
  [/§§\s*/g, 'parágrafos '],
  [/§\s*/g, 'parágrafo '],
  [/\bArts\.\s*/g, 'artigos '],
  [/\bArt\.\s*/g, 'artigo '],
  [/\bn[º°]\s*(?=\d)/g, 'número '],
  [/\bLC\b/g, 'Lei Complementar'],
  [/\bCF\b/g, 'Constituição Federal'],
  [/\bex\.\s*:/gi, 'por exemplo:'],
  [/\bp\.\s*ex\./gi, 'por exemplo'],
  [/\bTI\b/g, 'T I'],
  [/=([A-ZÀ-Ú]{2,})\(\)/g, 'função $1 '], // =SOMA() -> "função SOMA"
  [/\$/g, ' cifrão '], // $A$1 -> "cifrão A cifrão 1"
  [/(^|[\s(/])\.([a-z]{2,5})\b/g, '$1ponto $2'], // .docx -> "ponto docx"
  [/favoráveis\s*\/\s*casos possíveis/g, 'favoráveis sobre casos possíveis'],
];

/** Datas, intervalos, fatorial e proporções. */
function numeros(s: string): string {
  return s
    .replace(/[₀-₉]/g, (c) => ' ' + SUBSCRITOS[c])
    .replace(/\b(até|dia|em)\s+(\d{1,2})\/(\d{1,2})\b/gi, (m, pre: string, dia: string, mes: string) =>
      MESES[Number(mes) - 1] ? `${pre} ${dia} de ${MESES[Number(mes) - 1]}` : m,
    ) // até 20/12 -> "até 20 de dezembro"
    .replace(/(\d+)\s*[–-]\s*(?=\d)/g, '$1 a ') // 1718–1719 -> "1718 a 1719"
    .replace(/(?<![\p{L}\d])(\d+|\p{L})!/gu, '$1 fatorial')
    .replace(/\)!/g, ') fatorial')
    .replace(/fatorial(?=\()/g, 'fatorial vezes ') // p!(n−p)! -> "p fatorial vezes (n menos p) fatorial"
    .replace(/(\d)\s*x\s*(?=\d)/g, '$1 vezes ')
    .replace(/(\d{4,})\/(\d{4,})/g, '$1 e $2') // ISO 27001/27002 -> "27001 e 27002"
    .replace(/(\d+(?:\.\d+)?)\/(\d{4})\b/g, '$1 de $2') // 93/2003 -> "93 de 2003"
    .replace(/(\d+)\/(\d+)/g, '$1 sobre $2');
}

/** Setas: "p→q" é lógica ("implica"); "A → B" é fluxo, e vira uma pausa. */
function setas(s: string): string {
  return s
    .replace(/(?<=:\s)→(?=\s*[;.]|\s*$)/g, ' implica ') // célula de tabela só com a seta
    .replace(/\s→\s/g, ', ')
    .replace(/→/g, ' implica ');
}

/** "=" entre palavras é "é" (definição); entre contas é "igual a". */
function igualdade(s: string): string {
  const palavra = (t: string) => /^\p{L}{3,}$/u.test(t);
  return s.replace(/\s*=\s*/g, (m, pos: number, todo: string) => {
    const esq = todo.slice(0, pos).match(/([\p{L}\d]+)[^\p{L}\d]*$/u)?.[1] ?? '';
    const dir = todo.slice(pos + m.length).match(/^[^\p{L}\d]*([\p{L}\d]+)/u)?.[1] ?? '';
    return palavra(esq) || palavra(dir) ? ' é ' : ' igual a ';
  });
}

/** Barras entre palavras viram "ou"; as demais, "sobre". */
function barras(s: string): string {
  return s
    .replace(/([\p{L}\d])\/(?=\p{L})/gu, '$1 ou ')
    .replace(/\s\/\s/g, ', ')
    .replace(/\//g, ' sobre ');
}

/** Remove a sintaxe Markdown de uma linha, deixando só o texto. */
function semMarkdown(linha: string): string {
  return linha
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    // "e", "ou", "se"… entre aspas: sem pausa, `negar "e" vira "ou"` fica ambíguo de ouvir
    .replace(/[“"](\p{L}{1,2})[”"]\/[“"](\p{L}{1,2})[”"]/gu, ', $1 ou $2, ')
    .replace(/[“"](\p{L}{1,2})[”"]/gu, ', $1, ')
    .replace(/[“”"]/g, '')
    .replace(/<[^>]+>/g, '');
}

/** Converte tabelas Markdown em frases: "Coluna: valor; Coluna: valor." */
function tabelasParaFrases(linhas: string[]): string[] {
  const saida: string[] = [];
  for (let i = 0; i < linhas.length; i++) {
    if (!linhas[i].trim().startsWith('|')) {
      saida.push(linhas[i]);
      continue;
    }
    const bloco: string[] = [];
    while (i < linhas.length && linhas[i].trim().startsWith('|')) bloco.push(linhas[i++]);
    i--;
    const celulas = (l: string) =>
      l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    const cabecalho = celulas(bloco[0]);
    for (const l of bloco.slice(1)) {
      const c = celulas(l);
      if (c.every((x) => /^:?-+:?$/.test(x))) continue; // linha separadora
      saida.push(cabecalho.map((h, k) => `${h}: ${c[k] ?? ''}`).join('; ') + '.');
    }
  }
  return saida;
}

/** Garante pontuação final, para a voz fazer a pausa entre itens. */
const comPontuacao = (s: string): string => (/[.!?:;…]$/.test(s) ? s : s + '.');

/** Markdown de um tópico -> texto corrido, uma frase por linha. */
export function markdownParaFala(markdown: string): string {
  const linhas = tabelasParaFrases(markdown.replace(/\r\n/g, '\n').split('\n'));
  const falas: string[] = [];
  for (const bruta of linhas) {
    let l = bruta.trim();
    if (!l || /^-{3,}$/.test(l)) continue;
    l = l
      .replace(/^#{1,6}\s+/, '')
      .replace(/^>\s?/, '')
      .replace(/^[-*+]\s+/, '')
      .replace(/^\d+\.\s+/, '');
    l = semMarkdown(l);
    for (const [re, por] of ABREVIACOES) l = l.replace(re, por);
    l = numeros(l);
    l = setas(l);
    l = igualdade(l);
    for (const [re, por] of SIMBOLOS) l = l.replace(re, por);
    l = barras(l);
    l = l
      .replace(/(\p{L}[)]?)\s+x\s+(?=\p{L})/gu, '$1 versus ')
      .replace(/\s*[—–]\s*/g, ', ')
      .replace(/\s+-\s+/g, ', ')
      .replace(/\s+/g, ' ')
      .replace(/\s+([,.;:!?])/g, '$1')
      .replace(/\(\s*,\s*/g, '(')
      .replace(/,\s*([)\]])/g, '$1')
      .replace(/,\s*([.;:!?])/g, '$1')
      .replace(/,(\s*,)+/g, ',')
      .trim();
    if (l) falas.push(comPontuacao(l));
  }
  return falas.join('\n');
}

/** "3. Fonética" -> "Tópico 3. Fonética."; "2–3. Organização" -> "Tópicos 2 a 3. Organização." */
export function tituloFalado(titulo: string): string {
  const faixa = titulo.match(/^(\d+)\s*[–-]\s*(\d+)\.\s*(.*)$/);
  if (faixa) return `Tópicos ${faixa[1]} a ${faixa[2]}. ${faixa[3]}`;
  const um = titulo.match(/^(\d+)\.\s*(.*)$/);
  if (um) return `Tópico ${um[1]}. ${um[2]}`;
  return titulo;
}

export interface TopicoParaFala {
  titulo: string;
  conteudo: string;
  fixacao: string[];
  fixacaoTitulo?: string;
}

/** Texto completo de um tópico: título, conteúdo e, se houver, a Fixação. */
export function textoDoTopico(t: TopicoParaFala): string {
  const partes = [tituloFalado(t.titulo), '', t.conteudo];
  if (t.fixacao.length) {
    partes.push('', `Fixação${t.fixacaoTitulo ? ', ' + t.fixacaoTitulo : ''}.`);
    t.fixacao.forEach((f, i) => partes.push(`Número ${i + 1}: ${f}`));
  }
  return markdownParaFala(partes.join('\n'));
}

/** Corta uma frase longa em pedaços de até `max` caracteres, de preferência em vírgulas. */
function cortar(frase: string, max: number): string[] {
  const partes: string[] = [];
  let resto = frase;
  while (resto.length > max) {
    let i = resto.lastIndexOf(', ', max);
    if (i < max * 0.4) i = resto.lastIndexOf(' ', max);
    if (i <= 0) i = max;
    partes.push(resto.slice(0, i + 1).trim());
    resto = resto.slice(i + 1).trim();
  }
  if (resto) partes.push(resto);
  return partes;
}

/**
 * Divide o texto em trechos curtos. Os navegadores cortam falas longas (Chrome para após
 * ~15 s), e trechos curtos também permitem pausar/retomar e trocar a velocidade sem perder
 * o lugar. Frases curtas vizinhas são unidas para não picotar a leitura.
 */
export function partirEmTrechos(texto: string, max = 220): string[] {
  const frases: string[] = [];
  for (const linha of texto.split('\n')) {
    for (const f of linha.trim().split(/(?<=[.!?…;:])\s+/u)) {
      if (f.trim()) frases.push(...cortar(f.trim(), max));
    }
  }
  const trechos: string[] = [];
  let atual = '';
  for (const f of frases) {
    if (!atual) atual = f;
    else if (atual.length + 1 + f.length <= max) atual += ' ' + f;
    else {
      trechos.push(atual);
      atual = f;
    }
  }
  if (atual) trechos.push(atual);
  return trechos;
}
