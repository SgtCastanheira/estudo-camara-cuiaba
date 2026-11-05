// Rodar: npm run test:fala  (inclui estes testes)
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { conteudoParaNos, contarNos, disciplinaParaNo, inlineParaHtml, topicoParaNo } from './arvore.ts';

const texto = (n: { content: string }) => n.content.replace(/<[^>]+>/g, '');

test('"**Termo:** explicação" vira nó com filho', () => {
  const [n] = conteudoParaNos('- **Ideia central x secundária:** a central sustenta o texto.');
  assert.equal(texto(n), 'Ideia central x secundária');
  assert.equal(texto(n.children[0]), 'a central sustenta o texto');
});

test('código como termo, listas aninhadas, seções e tabela', () => {
  const md = '### Regência\n- `Assistir` = ver → exige **a**\n  - sub item\n\n| Word | Writer |\n|---|---|\n| Excel | Calc |';
  const nos = conteudoParaNos(md);
  assert.equal(texto(nos[0]), 'Regência');
  const assistir = nos[0].children[0];
  assert.equal(texto(assistir), 'Assistir');
  assert.match(assistir.content, /<code>/);
  assert.equal(texto(assistir.children[0]), 'ver → exige a');
  assert.equal(texto(assistir.children[1]), 'sub item'); // aninhado fica sob o item
  assert.equal(texto(nos[0].children[1]), 'Excel'); // tabela: 1ª coluna = termo (cabeçalho não vira nó)
  assert.equal(texto(nos[0].children[1].children[0]), 'Writer: Calc'); // coluna: valor
});

test('HTML do conteúdo é escapado', () => {
  assert.equal(inlineParaHtml('<script>x</script> **b**'), '&lt;script&gt;x&lt;/script&gt; <strong>b</strong>');
});

test('fixação vira ramo', () => {
  const n = topicoParaNo({ titulo: '3. Fonética', conteudo: '- a', fixacao: ['um', 'dois'], fixacaoTitulo: 'acentuação' });
  const fix = n.children.at(-1)!;
  assert.match(texto(fix), /Fixação · acentuação/);
  assert.equal(fix.children.length, 2);
});

const src = readFileSync(new URL('../data/conteudo.gerado.ts', import.meta.url), 'utf8');
const c = JSON.parse(src.slice(src.indexOf('= {') + 2, src.lastIndexOf(';'))) as Record<string, { topicos: any[] }>;

test('conteúdo real: toda disciplina gera um mapa limpo e de tamanho razoável', () => {
  for (const [id, d] of Object.entries(c)) {
    const raiz = disciplinaParaNo(id, d.topicos);
    assert.equal(raiz.children.length, d.topicos.length, `${id}: um ramo por tópico`);
    const total = contarNos(raiz);
    assert.ok(total > d.topicos.length * 2 && total < 900, `${id}: ${total} nós`);
    const json = JSON.stringify(raiz);
    assert.doesNotMatch(json, /\*\*|\|---|undefined|\[object/, `${id}: sobrou Markdown cru`);
    const vazios = JSON.stringify(raiz).match(/"content":""/g);
    assert.equal(vazios, null, `${id}: nó vazio`);
  }
});
