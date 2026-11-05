// Rodar: npm run test:fala   (Node 24 executa TypeScript direto; não faz parte do build do app)
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { markdownParaFala, partirEmTrechos, textoDoTopico, tituloFalado } from './fala.ts';

const fala = (md: string) => markdownParaFala(md);

test('artigos, parágrafos e leis', () => {
  assert.match(fala('Posse (Art. 24 §2º) em 30 dias'), /artigo 24 parágrafo 2º/);
  assert.match(fala('Estatuto (LC 93/2003)'), /Lei Complementar 93 de 2003/);
  assert.match(fala('LAI (12.527/2011)'), /12\.527 de 2011/);
  assert.match(fala('Resolução nº 08, de 2016'), /Resolução número 08/);
  assert.match(fala('ISO 27001/27002'), /27001 e 27002/);
  assert.match(fala('Arts. 9–11'), /artigos 9 a 11/);
});

test('símbolos lógicos e matemáticos', () => {
  assert.match(fala('Negar (p→q) = **p ∧ ~q**'), /\(p implica q\) igual a p e não q/);
  assert.match(fala('p→q ≡ ~q→~p ≡ ~p∨q'), /equivale a não q implica não p equivale a não p ou q/);
  assert.match(fala('exatamente uma V ⊻'), /ou exclusivo/);
  assert.match(fala('n(A∪B) = n(A) + n(B) − n(A∩B)'), /união.*mais.*menos.*interseção/);
  assert.match(fala('termo = a₁ + (n−1)·r'), /a 1 mais \(n menos 1\) vezes r/);
  assert.match(fala('0! = 1. 5! = 120.'), /0 fatorial é 1\. 5 fatorial é 120/);
  assert.match(fala('C(n,p)=n!/[p!(n−p)!]'), /n fatorial sobre/);
  assert.match(fala('1718–1719'), /1718 a 1719/);
  assert.match(fala('+70% do comissionado'), /mais 70%/);
  assert.match(fala('1/3 de férias'), /1 sobre 3/);
});

test('setas: lógica "p→q" é "implica"; fluxo "A → B" é pausa', () => {
  assert.match(fala('só é FALSA em V→F'), /V implica F/);
  assert.match(fala('Emissor → mensagem → receptor'), /^Emissor, mensagem, receptor\.$/);
  assert.match(fala('registradores → cache → RAM'), /registradores, cache, RAM/);
  // seta sozinha numa célula de tabela
  assert.match(fala('| Conectivo | Símbolo |\n|---|---|\n| se…então | → |'), /Símbolo: implica\./);
});

test('"=": definição vira "é"; conta vira "igual a"', () => {
  assert.match(fala('**Condição suficiente** = o "se" (antecedente)'), /Condição suficiente é o, se, \(antecedente\)/);
  assert.match(fala('inferência = conclusão apoiada no texto'), /inferência é conclusão/);
  assert.match(fala('**27001** = requisitos do SGSI'), /27001 é requisitos/);
  assert.match(fala('n(A∪B) = n(A) + n(B)'), /n\(A união B\) igual a n\(A\) mais n\(B\)/);
  assert.match(fala('P(não A) = 1 − P(A)'), /igual a 1 menos/);
});

test('aspas em "e", "ou", "se" ganham pausa (senão fica ambíguo de ouvir)', () => {
  assert.match(fala('negar "e" vira "ou" (e vice-versa)'), /^negar, e, vira, ou, \(e vice-versa\)\.$/);
  assert.match(fala('Hiato "i"/"u" tônicos'), /Hiato, i ou u, tônicos/);
  assert.match(fala('ditongo (vogal+semivogal: "pai")'), /"pai"|pai/); // palavra de 3+ letras não ganha vírgulas
  assert.doesNotMatch(fala('ditongo (vogal e semivogal: "pai")'), /, pai,/);
});

test('Excel/Calc: cifrão, funções, extensões e teclas', () => {
  assert.match(fala('Referência absoluta `$A$1` trava'), /cifrão A cifrão 1 trava/);
  assert.match(fala('mistas `$A1`/`A$1`'), /cifrão A1 ou A cifrão 1/);
  assert.match(fala('`=SOMA() =SE() =PROCV()`'), /função SOMA função SE função PROCV/);
  assert.match(fala('textos (.docx/.odt)'), /textos \(ponto docx ou ponto odt\)/);
  assert.match(fala('`Ctrl+C/V/X/Z/Y`'), /Ctrl mais C ou V ou X ou Z ou Y/);
});

test('datas, frações e fórmulas com barra', () => {
  assert.match(fala('pago até 20/12.'), /até 20 de dezembro/);
  assert.match(fala('13º: 1/12 por mês'), /1 sobre 12 por mês/);
  assert.match(fala('Probabilidade = casos favoráveis / casos possíveis'), /Probabilidade é casos favoráveis sobre casos possíveis/);
  assert.match(fala('C(n,p)=n!/[p!(n−p)!]'), /n fatorial sobre \[p fatorial vezes \(n menos p\) fatorial\]/);
});

test('"!" de exclamação não vira fatorial', () => {
  assert.equal(fala('Muito bom!'), 'Muito bom!');
});

test('palavras, barras e abreviações', () => {
  assert.match(fala('Inferência x extrapolação'), /Inferência versus extrapolação/);
  assert.match(fala('Prefiro X a Y'), /Prefiro X a Y/); // X maiúsculo é variável, não "versus"
  assert.match(fala('`portanto/logo` → conclusão'), /portanto ou logo, conclusão/);
  assert.match(fala('ratificar = confirmar / retificar = corrigir'), /confirmar, retificar/);
  assert.match(fala('(ex.: editorial opina)'), /por exemplo: editorial opina/);
  assert.match(fala('Analista Legislativo - TI'), /T I/);
  assert.match(fala('CF e LC'), /Constituição Federal e Lei Complementar/);
});

test('remove a sintaxe Markdown', () => {
  const md = '### Regência\n- **Assistir** = ver → exige **a** ("assistir **ao** filme").\n> citação\n---';
  const saida = fala(md);
  assert.doesNotMatch(saida, /[*#`>|"]|---/);
  assert.match(saida, /^Regência\.$/m); // título vira frase própria
  assert.match(saida, /Assistir é ver, exige a/);
});

test('tabela vira frases "Coluna: valor"', () => {
  const md = '| Conectivo | Símbolo | Verdadeiro quando… |\n|---|---|---|\n| e | ∧ | ambas V |\n| ou | ∨ | pelo menos uma V |';
  const saida = fala(md).split('\n');
  assert.equal(saida.length, 2);
  assert.equal(saida[0], 'Conectivo: e; Símbolo: e; Verdadeiro quando…: ambas V.');
  assert.doesNotMatch(fala(md), /\|/);
});

test('cada linha termina com pontuação (a voz faz a pausa)', () => {
  for (const linha of fala('- um\n- dois:\n- três!').split('\n')) assert.match(linha, /[.!?:;…]$/);
});

test('título falado', () => {
  assert.equal(tituloFalado('3. Fonética e ortografia'), 'Tópico 3. Fonética e ortografia');
  assert.equal(tituloFalado('2–3. Organização: direta e indireta'), 'Tópicos 2 a 3. Organização: direta e indireta');
  assert.equal(tituloFalado('Parte A — Estatuto dos Servidores'), 'Parte A — Estatuto dos Servidores');
});

test('textoDoTopico: título, conteúdo e fixação', () => {
  const t = textoDoTopico({
    titulo: '3. Fonética',
    conteudo: '- Todas as **proparoxítonas** são acentuadas.',
    fixacao: ['Toda proparoxítona leva acento.', 'Ideia perdeu o acento.'],
    fixacaoTitulo: 'acentuação',
  });
  assert.match(t, /^Tópico 3\. Fonética\./);
  assert.match(t, /Fixação, acentuação\./);
  assert.match(t, /Número 1: Toda proparoxítona leva acento\./);
  assert.match(t, /Número 2: Ideia perdeu o acento\./);
});

test('partirEmTrechos: respeita o limite e não perde nem junta palavras', () => {
  const longo = 'Primeira frase curta. ' + 'palavra, '.repeat(80) + 'fim da frase longa. Última.';
  const trechos = partirEmTrechos(longo, 220);
  assert.ok(trechos.length > 2);
  for (const t of trechos) assert.ok(t.length <= 220, `trecho com ${t.length} caracteres`);
  const palavras = (s: string) => s.split(/\s+/).filter(Boolean);
  assert.deepEqual(palavras(trechos.join(' ')), palavras(longo));
  assert.deepEqual(partirEmTrechos(''), []);
});

// ---- propriedade sobre TODO o conteúdo real do app
const src = readFileSync(new URL('../data/conteudo.gerado.ts', import.meta.url), 'utf8');
const conteudo = JSON.parse(src.slice(src.indexOf('= {') + 2, src.lastIndexOf(';'))) as Record<
  string,
  { topicos: { titulo: string; conteudo: string; fixacao: string[]; fixacaoTitulo?: string }[] }
>;
const topicos = Object.entries(conteudo).flatMap(([disc, c]) => c.topicos.map((t) => ({ disc, ...t })));

test(`conteúdo real: ${topicos.length} tópicos viram texto falável, sem sobras de símbolos`, () => {
  assert.ok(topicos.length >= 60);
  const proibidos = /[*|`#>→∧∨⊻↔≡≈∪∩~§^_=]|undefined|NaN|\[object/;
  for (const t of topicos) {
    const texto = textoDoTopico(t);
    assert.ok(texto.length > 40, `${t.disc}/${t.titulo}: texto curto demais`);
    const achou = texto.match(proibidos);
    assert.equal(achou, null, `${t.disc}/${t.titulo}: sobrou "${achou?.[0]}" -> ...${texto.slice(Math.max(0, (achou?.index ?? 0) - 30), (achou?.index ?? 0) + 30)}...`);
    const trechos = partirEmTrechos(texto);
    assert.ok(trechos.length > 0);
    for (const tr of trechos) assert.ok(tr.length <= 220, `${t.disc}/${t.titulo}: trecho de ${tr.length}`);
    const palavras = (s: string) => s.split(/\s+/).filter(Boolean);
    assert.deepEqual(palavras(trechos.join(' ')), palavras(texto.replace(/\n/g, ' ')), `${t.disc}/${t.titulo}: perdeu palavras ao dividir`);
  }
});
