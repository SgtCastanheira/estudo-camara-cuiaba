---
id: "02"
slug: rlm
titulo: "Raciocínio Lógico e Matemático"
bloco: "Conhecimentos Básicos"
questoes: 10
peso: medio
---

# 02 · Raciocínio Lógico e Matemático

5 questões dentro dos Conhecimentos Básicos. Conteúdo do Anexo V. É a matéria mais **treinável**: resolva com papel, mostrando a conta. Cada tópico traz um exemplo resolvido.

## 1. Operações com conjuntos
- União (∪), interseção (∩), diferença (A − B: está em A e não em B), complementar (o que falta para o universo).
- **Pertinência x inclusão:** elemento **pertence** (∈) a conjunto; conjunto **está contido** (⊂) em conjunto. Misturar os dois é pegadinha clássica.
- Um conjunto com **n elementos** tem **2ⁿ subconjuntos**.
- **Inclusão-exclusão (2 conjuntos):** n(A∪B) = n(A) + n(B) − n(A∩B).
- **Três conjuntos:** n(A∪B∪C) = n(A)+n(B)+n(C) − n(A∩B) − n(A∩C) − n(B∩C) + n(A∩B∩C).
- **Estratégia:** monte o diagrama de Venn e preencha **de dentro para fora** (primeiro a interseção de todos, depois as de dois, por último as partes exclusivas).
- **Exemplo:** de 30 pessoas, 18 leem o jornal A, 15 leem o B e 5 não leem nenhum. Quantas leem os dois? Leem pelo menos um: 30 − 5 = 25. Então 18 + 15 − x = 25, logo **x = 8**.

## 2. Raciocínio numérico e sequencial
- **Conjuntos numéricos:** naturais ⊂ inteiros ⊂ racionais ⊂ reais. Irracionais: dízimas não periódicas (√2, π). Dízima periódica é racional.
- **MMC** (quando os eventos voltam a coincidir) e **MDC** (maior grupo igual possível). Ex.: dois sinais acendem a cada 12 e 18 min; voltam a coincidir a cada MMC(12,18) = **36 min**.
- **Porcentagem:** aumento de 20% = × 1,20; desconto de 20% = × 0,80. **Aumentos sucessivos multiplicam:** 10% e depois 10% = 1,1 × 1,1 = 1,21 → **21%**, não 20%.
- **Regra de três:** *direta* (as grandezas crescem juntas) e *inversa* (uma cresce, a outra diminui, como operários x dias). **Composta:** compare cada grandeza com a incógnita.
- **Razão e proporção:** a/b = c/d ⇒ a·d = b·c. **Divisão proporcional:** divida o total pela soma das partes e multiplique.
- **PA:** termo = a₁ + (n−1)·r. **Soma** Sₙ = (a₁ + aₙ)·n / 2. Ex.: 1 + 2 + … + 100 = (1+100)·100/2 = **5050**.
- **PG:** termo = a₁ · q^(n−1). **Soma** Sₙ = a₁(qⁿ − 1)/(q − 1). **PG infinita** com q entre −1 e 1 (módulo menor que 1): S = a₁/(1 − q). Ex.: 1 + 1/2 + 1/4 + … = **2**.
- **Sequências:** procure o padrão (soma fixa, produto fixo, diferenças crescentes, quadrados, primos, Fibonacci, alternância entre duas regras).
- **Velocidade média** = distância / tempo (não é a média das velocidades quando os tempos diferem).

## 3. Proposições, conectivos e tabela-verdade
- **Proposição** é uma sentença declarativa a que se pode atribuir V ou F. **Não são proposições:** perguntas, ordens, exclamações, sentenças abertas ("x + 2 = 5") e paradoxos.
- A tabela-verdade de n proposições tem **2ⁿ linhas**.

| Conectivo | Símbolo | Verdadeiro quando… |
|---|---|---|
| e | ∧ | ambas V |
| ou | ∨ | pelo menos uma V |
| ou…ou | ⊻ | exatamente uma V |
| se…então | → | só é FALSA em V→F |
| se e somente se | ↔ | os dois com mesmo valor |

| p | q | p∧q | p∨q | p→q | p↔q |
|---|---|---|---|---|---|
| V | V | V | V | V | V |
| V | F | F | V | **F** | F |
| F | V | F | V | V | F |
| F | F | F | F | V | V |

- **Tautologia:** sempre verdadeira. **Contradição:** sempre falsa. **Contingência:** depende dos valores.
- **Condição suficiente** = o "se" (antecedente). **Necessária** = o "então" (consequente). "p **somente se** q" significa p → q.
- **Negações (decore):** ~(p∧q) = ~p ∨ ~q · ~(p∨q) = ~p ∧ ~q · ~(p→q) = **p ∧ ~q** · ~(p↔q) = p ⊻ q.
- **Exemplo:** a negação de "Se chove, então a rua molha" é "Chove **e** a rua não molha".

> **FIXAÇÃO**
> 1. V→F é a ÚNICA combinação que dá FALSO no condicional.
> 2. Negar (p→q) = **p ∧ ~q** (mantém a 1ª, nega a 2ª, vira "e").
> 3. De Morgan: negar "e" vira "ou" (e vice-versa), negando tudo.
> 4. Condicional com antecedente falso é sempre verdadeiro.

## 4. Argumentação e diagramas lógicos
- **Argumento válido:** se as premissas forem verdadeiras, a conclusão **tem** de ser verdadeira. Validade não é o mesmo que a conclusão ser verdadeira na vida real.
- **Formas válidas:** *modus ponens* (p→q; p; logo q) · *modus tollens* (p→q; ~q; logo ~p) · silogismo hipotético (p→q; q→r; logo p→r) · silogismo disjuntivo (p∨q; ~p; logo q).
- **Falácias (inválidas):** afirmar o consequente (p→q; q; logo p) e negar o antecedente (p→q; ~p; logo ~q).
- **Como testar:** suponha as premissas V e veja se a conclusão sai obrigatória. Em problemas de "quem mente", teste a hipótese que torna todas as afirmações consistentes.
- **Diagramas de Venn:** "Todo A é B" = A dentro de B · "Algum A é B" = interseção não vazia · "Nenhum A é B" = conjuntos disjuntos · "Algum A não é B" = parte de A fora de B.

## 5. Equivalências e implicações
- **Condicional:** p→q ≡ **~q→~p** (contrapositiva) ≡ **~p ∨ q**. É a mais cobrada.
- **Bicondicional:** p↔q ≡ (p→q) ∧ (q→p).
- "p ou q" ≡ ~p → q. "p e q" ≡ ~(~p ∨ ~q).
- **Cuidado:** a **recíproca** (q→p) e a **inversa** (~p→~q) **não** são equivalentes ao condicional original.
- **Implicações simples:** p∧q ⟹ p · p ⟹ p∨q.
- **Exemplo:** "Se estudo, então passo" ≡ "Se não passo, então não estudei" ≡ "Não estudo ou passo".

## 6. Quantificadores
- Universal (∀, "todo/para todo/qualquer") e existencial (∃, "existe/algum/pelo menos um").
- **Negações:** ~(∀x p) = ∃x ~p · ~(∃x p) = ∀x ~p.
- Na linguagem: negar "**Todo** A é B" = "**Algum** A **não** é B". Negar "**Algum** A é B" = "**Nenhum** A é B". Negar "**Nenhum** A é B" = "**Algum** A é B".
- **Erro comum:** a negação de "Todo A é B" **não** é "Nenhum A é B".
- Equivalência útil: "Todo A é B" ≡ "Nenhum A é não-B".

## 7. Contagem
- **Princípio multiplicativo** (etapas sucessivas, "e") → multiplica. **Aditivo** (casos que não ocorrem juntos, "ou") → soma.
- **Ordem importa →** Arranjo A(n,p) = n!/(n−p)! ou Permutação P(n) = n!.
- **Ordem não importa →** Combinação C(n,p) = n!/[p!(n−p)!]. Vale C(n,p) = C(n,n−p), C(n,0) = 1.
- **Permutação com repetição:** n!/(n₁!·n₂!·…). Anagramas de CASA: 4!/2! = **12**.
- **Permutação circular:** (n−1)!.
- **Exemplos:** pódio com 3 de 10 pessoas (ordem importa): 10·9·8 = **720** · comissão de 3 em 8 pessoas (ordem não importa): C(8,3) = **56** · senha de 4 dígitos (0–9, com repetição): 10⁴ = **10.000**.
- **Truque do "pelo menos um":** conte o total e subtraia o caso em que **nenhum** acontece.

> **FIXAÇÃO**
> 1. Senha/pódio/fila = ordem importa. Comissão/grupo = ordem não importa.
> 2. 0! = 1. 5! = 120.
> 3. "Pelo menos um" = total − nenhum.
> 4. Probabilidade = casos favoráveis / casos possíveis (entre 0 e 1).

## 8. Probabilidade
- **P(A) = n(A) / n(Ω)** (espaço amostral equiprovável). **Complementar:** P(não A) = 1 − P(A).
- **União:** P(A∪B) = P(A) + P(B) − P(A∩B). Se **mutuamente exclusivos**, P(A∩B) = 0 e basta somar ("ou" → soma).
- **Independentes:** P(A∩B) = P(A)·P(B) ("e" → multiplica).
- **Condicional:** P(A dado B) = P(A∩B) / P(B) (a probabilidade de A sabendo que B ocorreu).
- **Exemplos:** soma 7 com dois dados: 6/36 = **1/6** · pelo menos uma coroa em 3 lançamentos: 1 − (1/2)³ = **7/8** · urna com 5 bolas vermelhas e 3 azuis, duas retiradas **sem reposição**, ambas vermelhas: (5/8)·(4/7) = **5/14**.
- **Sem reposição** muda o denominador a cada retirada; **com reposição** os eventos são independentes.

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
