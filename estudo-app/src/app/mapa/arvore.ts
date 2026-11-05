/**
 * Converte o conteúdo (Markdown) de cada tópico numa árvore para o mapa mental.
 * Regra principal: "**Termo:** explicação" vira o nó "Termo" com a explicação como filho,
 * para o mapa mostrar as palavras-chave e abrir o detalhe ao tocar. Funções puras.
 */

export interface NoMapa {
  /** HTML seguro (já escapado). */
  content: string;
  children: NoMapa[];
}

export interface TopicoParaMapa {
  titulo: string;
  conteudo: string;
  fixacao: string[];
  fixacaoTitulo?: string;
}

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Markdown inline -> HTML mínimo e seguro (negrito, código, itálico). */
export function inlineParaHtml(texto: string): string {
  return escapar(texto)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/(?<![\w*])\*([^*\s][^*]*)\*(?![\w*])/g, '<em>$1</em>');
}

const no = (texto: string, filhos: NoMapa[] = []): NoMapa => ({ content: inlineParaHtml(texto), children: filhos });

/** Divide "**Termo:** explicação" ou "`código` = explicação" em termo e detalhe. */
function termoEDetalhe(texto: string): { termo: string; detalhe: string } {
  const negrito = texto.match(/^\*\*(.+?)\*\*\s*(.*)$/);
  if (negrito) {
    return {
      termo: negrito[1].replace(/\s*[:：]\s*$/, ''),
      detalhe: negrito[2].replace(/^[:\-–—]\s*/, '').trim(),
    };
  }
  const codigo = texto.match(/^`([^`]+)`\s*(?:[=→:–-])\s*(.*)$/);
  if (codigo) return { termo: '`' + codigo[1] + '`', detalhe: codigo[2].trim() };
  return { termo: texto, detalhe: '' };
}

/** Detalhe longo com ";" vira vários filhos curtos (mais fácil de ler no mapa). */
function detalheParaNos(detalhe: string): NoMapa[] {
  if (!detalhe) return [];
  const partes = detalhe.length > 60 ? detalhe.split(/;\s+/) : [detalhe];
  return partes.map((p) => no(p.replace(/[.;]$/, '')));
}

function itemParaNo(texto: string): NoMapa {
  const { termo, detalhe } = termoEDetalhe(texto.trim());
  return no(termo, detalheParaNos(detalhe));
}

/** Tabela Markdown -> um nó por linha: 1ª coluna = termo; demais colunas = "Coluna: valor". */
function tabelaParaNos(linhas: string[]): NoMapa[] {
  const celulas = (l: string) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const [cabecalho, ...resto] = linhas.map(celulas);
  return resto
    .filter((c) => !c.every((x) => /^:?-+:?$/.test(x)))
    .map((c) => {
      const detalhe = c.slice(1).map((v, k) => `${cabecalho[k + 1] ?? ''}: ${v}`.replace(/^: /, ''));
      return no(c[0], detalhe.length ? [no(detalhe.join(' · '))] : []);
    });
}

/** Conteúdo de um tópico -> lista de ramos (seções "###" viram ramos próprios). */
export function conteudoParaNos(markdown: string): NoMapa[] {
  const raiz: NoMapa[] = [];
  let secao: NoMapa | null = null;
  const pilha: { nivel: number; no: NoMapa }[] = []; // itens de lista aninhados
  const destino = () => (secao ? secao.children : raiz);

  const linhas = markdown.replace(/\r\n/g, '\n').split('\n');
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    if (!linha.trim() || /^-{3,}\s*$/.test(linha.trim())) continue;

    if (linha.trim().startsWith('|')) {
      const bloco: string[] = [];
      while (i < linhas.length && linhas[i].trim().startsWith('|')) bloco.push(linhas[i++]);
      i--;
      destino().push(...tabelaParaNos(bloco));
      pilha.length = 0;
      continue;
    }

    const titulo = linha.match(/^#{2,6}\s+(.*)$/);
    if (titulo) {
      secao = no(titulo[1].trim());
      raiz.push(secao);
      pilha.length = 0;
      continue;
    }

    const item = linha.match(/^(\s*)(?:[-*+]|\d+\.)\s+(.*)$/);
    if (item) {
      const nivel = Math.floor(item[1].replace(/\t/g, '  ').length / 2);
      const novo = itemParaNo(item[2]);
      while (pilha.length && pilha[pilha.length - 1].nivel >= nivel) pilha.pop();
      (pilha.length ? pilha[pilha.length - 1].no.children : destino()).push(novo);
      pilha.push({ nivel, no: novo });
      continue;
    }

    destino().push(itemParaNo(linha.replace(/^>\s?/, '').trim()));
  }
  return raiz;
}

/** Árvore de um tópico: título + conteúdo + ramo "Fixação". */
export function topicoParaNo(t: TopicoParaMapa): NoMapa {
  const filhos = conteudoParaNos(t.conteudo);
  if (t.fixacao.length) {
    filhos.push(no(`⚡ Fixação${t.fixacaoTitulo ? ' · ' + t.fixacaoTitulo : ''}`, t.fixacao.map(itemParaNo)));
  }
  return no(t.titulo, filhos);
}

/** Árvore da disciplina: nome no centro e um ramo por tópico. */
export function disciplinaParaNo(nome: string, topicos: TopicoParaMapa[]): NoMapa {
  return no(nome, topicos.map(topicoParaNo));
}

export function contarNos(n: NoMapa): number {
  return 1 + n.children.reduce((s, c) => s + contarNos(c), 0);
}
