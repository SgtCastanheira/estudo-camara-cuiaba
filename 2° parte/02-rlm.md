---
id: "02"
slug: rlm
titulo: "Raciocínio Lógico e Matemático"
bloco: "Conhecimentos Básicos"
questoes: 10
peso: medio
---

# 02 · Raciocínio Lógico e Matemático

5 questões dentro dos Conhecimentos Básicos. Conteúdo do Anexo V. Resolva mostrando a conta.

## 1. Operações com conjuntos
- União (∪), interseção (∩), diferença (−), complementar.
- **Inclusão-exclusão:** n(A∪B) = n(A) + n(B) − n(A∩B). Essencial em problema de "quantos fazem pelo menos um".

## 2. Raciocínio numérico e sequencial
- **PA** (progressão aritmética): termo = a₁ + (n−1)·r.
- **PG:** termo = a₁ · q^(n−1).
- Sequências: ache o padrão (soma fixa, produto fixo, alternância).

## 3. Proposições, conectivos e tabela-verdade
| Conectivo | Símbolo | Verdadeiro quando… |
|---|---|---|
| e | ∧ | ambas V |
| ou | ∨ | pelo menos uma V |
| ou…ou | ⊻ | exatamente uma V |
| se…então | → | só é FALSA em V→F |
| se e somente se | ↔ | os dois com mesmo valor |

- **Tautologia:** sempre verdadeira. **Contradição:** sempre falsa.
- **Condição suficiente** = o "se" (antecedente). **Necessária** = o "então" (consequente).

> **FIXAÇÃO**
> 1. V→F é a ÚNICA combinação que dá FALSO no condicional.
> 2. Negar (p→q) = **p ∧ ~q** (mantém a 1ª, nega a 2ª, vira "e").
> 3. De Morgan: negar "e" vira "ou" (e vice-versa), negando tudo.

## 4. Argumentação e diagramas lógicos
- "Todo A é B", "Algum A é B", "Nenhum A é B" → resolva com diagramas de Venn.
- Negar "Todo" = "Algum… não". Negar "Algum" = "Nenhum".

## 5. Equivalências e implicações
- **Contrapositiva:** p→q ≡ ~q→~p ≡ ~p∨q. A mais cobrada.

## 6. Quantificadores
- Universal (∀, "todo/para todo") e existencial (∃, "existe/algum").

## 7. Contagem
- **Ordem importa →** Arranjo A(n,p)=n!/(n−p)! ou Permutação P(n)=n!
- **Ordem não importa →** Combinação C(n,p)=n!/[p!(n−p)!]

> **FIXAÇÃO**
> 1. Senha/pódio/fila = ordem importa. Comissão/grupo = ordem não importa.
> 2. 0! = 1. 5! = 120.
> 3. Probabilidade = casos favoráveis / casos possíveis (entre 0 e 1).

## 8. Probabilidade
- "E" (eventos independentes) → multiplica. "Ou" (exclusivos) → soma.
- P(não A) = 1 − P(A).

---

## 10 questões no estilo Selecon

**1.** Numa repartição, 30 servidores dominam Excel, 25 dominam Word e 10 dominam ambos. Quantos dominam pelo menos um?
a) 45 b) 55 c) 65 d) 10

**2.** A negação de "Todo servidor é efetivo" é:
a) Nenhum servidor é efetivo
b) Algum servidor não é efetivo
c) Todo servidor não é efetivo
d) Algum servidor é efetivo

**3.** A negação de "Se chove, então a sessão é adiada" é:
a) Se não chove, a sessão não é adiada
b) Chove e a sessão não é adiada
c) Não chove e a sessão é adiada
d) Chove ou a sessão é adiada

**4.** Quantos anagramas tem a palavra PROVA (5 letras distintas)?
a) 25 b) 60 c) 120 d) 720

**5.** De 10 servidores, quantas comissões de 3 pessoas podem ser formadas?
a) 720 b) 120 c) 30 d) 1000

**6.** Ao lançar um dado, a probabilidade de sair número par é:
a) 1/6 b) 1/3 c) 1/2 d) 2/3

**7.** Na PA 2, 5, 8, 11, …, o 10º termo é:
a) 27 b) 29 c) 30 d) 32

**8.** "p → q" é logicamente equivalente a:
a) q → p b) ~p → ~q c) ~q → ~p d) p ∧ q

**9.** A proposição "ou chove ou faz sol" (ou exclusivo) é verdadeira quando:
a) os dois ocorrem
b) nenhum ocorre
c) exatamente um ocorre
d) sempre

**10.** "Ser aprovado é condição necessária para tomar posse." Isso significa:
a) quem é aprovado sempre toma posse
b) sem aprovação não há posse
c) posse garante aprovação
d) aprovação e posse são a mesma coisa

---

### GABARITO COMENTADO
1. **(a)** 30+25−10 = 45 (inclusão-exclusão).
2. **(b)** Negar "todo" → "algum… não".
3. **(b)** Negar p→q = p ∧ ~q: "chove E a sessão não é adiada".
4. **(c)** 5! = 120 (ordem importa, todas distintas).
5. **(b)** C(10,3) = 120 (ordem não importa).
6. **(c)** Pares {2,4,6} = 3 em 6 → 1/2.
7. **(b)** 2 + 9×3 = 29.
8. **(c)** Contrapositiva: ~q → ~p.
9. **(c)** "Ou exclusivo" é V quando exatamente uma parte é V.
10. **(b)** Condição necessária: sem ela, o fato não ocorre — sem aprovação, não há posse.
