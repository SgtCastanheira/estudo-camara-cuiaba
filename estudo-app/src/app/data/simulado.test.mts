import assert from 'node:assert/strict';
import { test } from 'node:test';
import { corrigir, sortear, type QuestaoSim } from './simulado.ts';

const q = (disc: string, area: QuestaoSim['area'], i: number): QuestaoSim => ({
  disc, area, id: `${disc}${i}`, enunciado: 'x', alternativas: ['a', 'b'], correta: 0, comentario: '',
});
const pool = [
  ...Array.from({ length: 10 }, (_, i) => q('port', 'basicos', i)),
  ...Array.from({ length: 10 }, (_, i) => q('mt', 'gerais', i)),
  ...Array.from({ length: 15 }, (_, i) => q('ti', 'especificos', i)),
];
const peso = { port: 5, mt: 5, ti: 30 };

test('sorteio respeita o total e a proporção da prova', () => {
  const s = sortear(pool, 20, peso);
  assert.equal(s.length, 20);
  assert.equal(new Set(s.map((x) => x.id)).size, 20, 'sem repetição');
  const conta = (d: string) => s.filter((x) => x.disc === d).length;
  assert.equal(conta('ti'), 15, 'TI limitada pelas questões disponíveis');
  assert.equal(conta('port') + conta('mt'), 5);
});

test('sorteio fica na ordem da prova (básicos, gerais, específicos)', () => {
  const s = sortear(pool, 12, peso);
  const areas = s.map((x) => x.area);
  assert.deepEqual(areas, [...areas].sort((a, b) => ['basicos', 'gerais', 'especificos'].indexOf(a) - ['basicos', 'gerais', 'especificos'].indexOf(b)));
});

test('pedir mais que o disponível devolve tudo', () => {
  assert.equal(sortear(pool, 500, peso).length, 35);
});

test('nota projetada pesa as áreas: 15 + 15 + 70', () => {
  const qs = [q('port', 'basicos', 1), q('port', 'basicos', 2), q('mt', 'gerais', 1), q('ti', 'especificos', 1)];
  const r = corrigir(qs, [0, 1, 0, 0]); // básicos 1/2, gerais 1/1, específicos 1/1
  assert.equal(r.acertos, 3);
  assert.equal(r.nota, 7.5 + 15 + 70);
  assert.equal(r.aprovado, true);
});

test('zerar uma área reprova mesmo com nota alta', () => {
  const qs = [q('port', 'basicos', 1), q('mt', 'gerais', 1), q('ti', 'especificos', 1)];
  const r = corrigir(qs, [1, 0, 0]);
  assert.equal(r.nota, 85);
  assert.equal(r.aprovado, false);
});

test('sem as três áreas não há nota projetada', () => {
  const r = corrigir([q('ti', 'especificos', 1)], [0]);
  assert.equal(r.nota, null);
  assert.equal(r.aprovado, null);
});

test('questão em branco conta como erro', () => {
  const r = corrigir([q('ti', 'especificos', 1)], [null]);
  assert.equal(r.acertos, 0);
});
