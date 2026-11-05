#!/usr/bin/env node
/**
 * Converte os .md da série de estudo em src/app/data/conteudo.gerado.ts.
 *
 * Uso:
 *   npm run conteudo                      # lê a pasta "2° parte" (irmã desta)
 *   node scripts/gerar-conteudo.mjs <pasta> [<pasta> ...]
 *
 * Só são lidos arquivos com cabeçalho YAML contendo "slug:". O slug vira o id da
 * disciplina (o nome do arquivo não importa). Formato esperado de cada .md:
 *
 *   ---  (frontmatter: id, slug, titulo, bloco, questoes, peso)  ---
 *   # NN · Título
 *   texto de introdução
 *   ## Tópico                      (um por tópico; "###" fica dentro do tópico)
 *   > **FIXAÇÃO** ou > **FIXAÇÃO (rótulo)**
 *   > 1. macete
 *   ## 10 questões no estilo Selecon
 *   **1.** enunciado
 *   a) ... b) ... c) ... d) ...
 *   ### GABARITO COMENTADO
 *   1. **(b)** comentário
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raizApp = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SAIDA = join(raizApp, 'src/app/data/conteudo.gerado.ts');

const erros = [];
const avisos = [];

// ---------------------------------------------------------------- utilidades

const slugify = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

const ehSeparador = (l) => /^-{3,}\s*$/.test(l.trim());

/** Remove linhas em branco e "---" do começo e do fim de um bloco. */
function aparar(linhas) {
  const vazio = (l) => l.trim() === '' || ehSeparador(l);
  let a = 0;
  let b = linhas.length;
  while (a < b && vazio(linhas[a])) a++;
  while (b > a && vazio(linhas[b - 1])) b--;
  return linhas.slice(a, b).join('\n');
}

function lerFrontmatter(texto) {
  const m = texto.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: null, corpo: texto };
  const meta = {};
  for (const linha of m[1].split('\n')) {
    const kv = linha.match(/^([\w-]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { meta, corpo: texto.slice(m[0].length) };
}

// ------------------------------------------------------------------ tópicos

/** Separa os blocos "> **FIXAÇÃO**" do texto do tópico. */
function extrairFixacao(linhas) {
  const corpo = [];
  const itens = [];
  let rotulo;
  let dentro = false;
  for (const l of linhas) {
    const ini = l.match(/^>\s*\*\*FIXA[ÇC][ÃA]O(?:\s*\(([^)]*)\))?\*\*\s*$/i);
    if (ini) {
      dentro = true;
      rotulo ??= ini[1]?.trim() || undefined;
      continue;
    }
    if (dentro && l.startsWith('>')) {
      const txt = l.replace(/^>\s?/, '').trim();
      const item = txt.match(/^\d+\.\s+(.*)$/);
      if (item) itens.push(item[1].trim());
      else if (txt && itens.length) itens[itens.length - 1] += ' ' + txt;
      continue;
    }
    dentro = false;
    corpo.push(l);
  }
  return { corpo, itens, rotulo };
}

// ----------------------------------------------------------------- questões

/** "a) x b) y c) z d) w" -> ["x","y","z","w"], exigindo a ordem a, b, c… */
function dividirAlternativas(texto) {
  if (!/^a\)\s/i.test(texto)) return null;
  const letras = 'abcdefgh';
  const res = [];
  let pos = 2;
  for (let i = 0; i < letras.length; i++) {
    const prox = letras[i + 1];
    const idx = prox ? texto.indexOf(` ${prox}) `, pos) : -1;
    if (idx === -1) {
      res.push(texto.slice(pos).trim());
      break;
    }
    res.push(texto.slice(pos, idx).trim());
    pos = idx + 4; // " b) "
  }
  return res;
}

function analisarQuestoes(arquivo, linhasQuestoes, linhasGabarito) {
  const lista = [];
  let q = null;
  for (const l of linhasQuestoes) {
    const m = l.match(/^\*\*(\d+)\.\*\*\s*(.*)$/);
    if (m) {
      q = { n: Number(m[1]), enun: [m[2].trim()], alt: [] };
      lista.push(q);
      continue;
    }
    const t = l.trim();
    if (!q || !t || ehSeparador(t)) continue;
    if (q.alt.length || /^[a-h]\)\s/i.test(t)) q.alt.push(t);
    else q.enun.push(t);
  }

  const gabarito = new Map();
  let ultimo = null;
  for (const l of linhasGabarito) {
    const m = l.match(/^(\d+)\.\s+\*\*\(([a-h])\)\*\*\s*(.*)$/i);
    if (m) {
      ultimo = Number(m[1]);
      gabarito.set(ultimo, { letra: m[2].toLowerCase(), comentario: m[3].trim() });
    } else if (ultimo !== null && l.trim() && !ehSeparador(l)) {
      gabarito.get(ultimo).comentario += ' ' + l.trim();
    }
  }

  return lista.map((item) => {
    const onde = `${arquivo}, questão ${item.n}`;
    const alternativas = dividirAlternativas(item.alt.join(' '));
    const gab = gabarito.get(item.n);
    if (!alternativas || alternativas.length < 2) erros.push(`${onde}: alternativas não reconhecidas`);
    else if (alternativas.some((a) => !a)) erros.push(`${onde}: alternativa vazia`);
    if (!gab) erros.push(`${onde}: sem gabarito`);
    const correta = gab ? 'abcdefgh'.indexOf(gab.letra) : -1;
    if (alternativas && correta >= alternativas.length) {
      erros.push(`${onde}: gabarito "${gab.letra}" fora das ${alternativas.length} alternativas`);
    }
    return {
      id: `q${item.n}`,
      enunciado: item.enun.join(' '),
      alternativas: alternativas ?? [],
      correta,
      comentario: gab?.comentario ?? '',
    };
  });
}

// ------------------------------------------------------------------ arquivo

function analisarArquivo(caminho, nome) {
  const texto = readFileSync(caminho, 'utf8').replace(/\r\n/g, '\n');
  const { meta, corpo } = lerFrontmatter(texto);
  if (!meta?.slug) {
    avisos.push(`${nome}: ignorado (sem "slug" no cabeçalho)`);
    return null;
  }

  const intro = [];
  const topicosBrutos = [];
  const linhasQuestoes = [];
  const linhasGabarito = [];
  let modo = 'intro';
  let atual = null;

  for (const linha of corpo.split('\n')) {
    if (/^###\s+GABARITO/i.test(linha)) {
      modo = 'gabarito';
      continue;
    }
    const h2 = linha.match(/^##\s+(.*)$/);
    if (h2) {
      if (/^\d+\s+quest(õ|o)es/i.test(h2[1])) {
        modo = 'questoes';
      } else {
        modo = 'topico';
        atual = { titulo: h2[1].trim(), linhas: [] };
        topicosBrutos.push(atual);
      }
      continue;
    }
    if (modo === 'intro') {
      if (!/^#\s/.test(linha)) intro.push(linha);
    } else if (modo === 'topico') atual.linhas.push(linha);
    else if (modo === 'questoes') linhasQuestoes.push(linha);
    else linhasGabarito.push(linha);
  }

  const usados = new Set();
  const topicos = topicosBrutos.map((t) => {
    const { corpo: sem, itens, rotulo } = extrairFixacao(t.linhas);
    let id = slugify(t.titulo) || 'topico';
    for (let i = 2; usados.has(id); i++) id = `${slugify(t.titulo)}-${i}`;
    usados.add(id);
    const conteudo = aparar(sem);
    if (!conteudo && !itens.length) erros.push(`${nome}: tópico "${t.titulo}" vazio`);
    return { id, titulo: t.titulo, conteudo, fixacao: itens, fixacaoTitulo: rotulo };
  });

  const questoes = analisarQuestoes(nome, linhasQuestoes, linhasGabarito);

  if (!topicos.length) erros.push(`${nome}: nenhum tópico ("## ...") encontrado`);
  if (!questoes.length) erros.push(`${nome}: nenhuma questão encontrada`);
  if (meta.questoes && Number(meta.questoes) !== questoes.length) {
    avisos.push(`${nome}: cabeçalho diz ${meta.questoes} questões, mas há ${questoes.length}`);
  }

  return {
    slug: meta.slug,
    conteudo: {
      peso: ['facil', 'medio', 'alto', 'critico'].includes(meta.peso) ? meta.peso : undefined,
      intro: aparar(intro) || undefined,
      topicos,
      questoes,
    },
  };
}

// --------------------------------------------------------------------- main

function pastasDeEntrada() {
  if (process.argv.length > 2) return process.argv.slice(2).map((p) => resolve(process.cwd(), p));
  // Padrão: pasta irmã do app cujo nome é "2° parte" (aceita variações de "°"/"º").
  const pai = resolve(raizApp, '..');
  return readdirSync(pai)
    .filter((n) => /^2\S*\s+parte$/i.test(n) && statSync(join(pai, n)).isDirectory())
    .map((n) => join(pai, n));
}

const pastas = pastasDeEntrada().filter((p) => existsSync(p));
if (!pastas.length) {
  if (existsSync(SAIDA)) {
    console.log('[conteudo] pasta de .md não encontrada; mantendo o conteúdo já gerado.');
    process.exit(0);
  }
  console.error('[conteudo] ERRO: pasta de .md não encontrada e não há conteúdo gerado.');
  process.exit(1);
}

const resultado = {};
for (const pasta of pastas) {
  for (const nome of readdirSync(pasta).filter((n) => n.toLowerCase().endsWith('.md')).sort()) {
    const r = analisarArquivo(join(pasta, nome), nome);
    if (!r) continue;
    if (resultado[r.slug]) erros.push(`${nome}: slug "${r.slug}" repetido`);
    resultado[r.slug] = r.conteudo;
  }
}

for (const a of avisos) console.warn(`[conteudo] aviso: ${a}`);
if (erros.length) {
  for (const e of erros) console.error(`[conteudo] ERRO: ${e}`);
  console.error(`[conteudo] ${erros.length} erro(s); nada foi gerado.`);
  process.exit(1);
}

const cabecalho = `// ARQUIVO GERADO por scripts/gerar-conteudo.mjs a partir dos .md — NÃO edite à mão.
// Para atualizar: edite o .md e rode \`npm run conteudo\` (o \`npm start\` e o \`npm run build\` já rodam).
import { ConteudoDisciplina } from './modelos';

export const CONTEUDO_GERADO: Record<string, ConteudoDisciplina> = `;
writeFileSync(SAIDA, cabecalho + JSON.stringify(resultado, null, 2) + ';\n', 'utf8');

for (const [slug, c] of Object.entries(resultado)) {
  const fix = c.topicos.filter((t) => t.fixacao.length).length;
  console.log(
    `[conteudo] ${slug.padEnd(12)} ${String(c.topicos.length).padStart(2)} tópicos (${fix} com fixação)` +
      ` · ${String(c.questoes.length).padStart(2)} questões`,
  );
}
console.log(`[conteudo] gerado: ${SAIDA}`);
