# Prompts de Estudo — Analista Legislativo · TI (Câmara de Cuiabá)

Concurso Câmara Municipal de Cuiabá · Edital 001/2026-CMC · banca Instituto Selecon · prova 13/12/2026.
Copie o bloco da matéria/método, cole no chat da IA no VS Code e salve a resposta num `.md`.

## Como usar
1. Abra o chat da IA (Copilot Chat, Claude, etc.) e um arquivo `.md` para salvar o retorno.
2. Copie o prompt, cole no chat. Resolva as questões **antes** de ver o gabarito.
3. Depois peça: `gere mais 10, focando nos itens que errei`.
4. **Legislação:** aponte o arquivo da lei com `#file:leis/...` (veja `LEIS-README.md`) — a IA não conhece a lei de Cuiabá e inventa artigo sem a fonte.

Ordem sugerida: aprenda com **01–09** → visão geral com **M1 (mapa)** → decoreba com **M3/M5** → teste com **M4 (Feynman)** → revisão passiva com **M2 (podcast)** → **M6** e **simulado (10)** toda semana.

---

## ★ Modelo-mestre (base de todos)

```text
Você é professor especialista em concursos públicos e examinador no estilo da banca INSTITUTO SELECON. Estou me preparando para o cargo de ANALISTA LEGISLATIVO - TECNOLOGIA DA INFORMAÇÃO da Câmara Municipal de Cuiabá (Edital 001/2026-CMC, prova em 13/12/2026, nível superior).

MATÉRIA: {nome da matéria}

CONTEÚDO PROGRAMÁTICO OFICIAL (Anexo V) desta matéria:
{cole aqui os itens exatos}

SUA TAREFA, nesta ordem:
1. Explique CADA item acima em detalhe — do conceito-base até o nível que a banca cobra — com exemplos. Em cada item, aponte as PEGADINHAS clássicas e, quando for norma/lei, a "letra da lei" (artigo, prazo, número).
2. Ao fim de cada item, um bloco "FIXAÇÃO" com 3 macetes curtos.
3. Depois, 10 QUESTÕES INÉDITAS de múltipla escolha (4 alternativas A–D), no estilo e no nível de dificuldade da Selecon, cobrando no rigor da lei/norma quando couber. Misture fácil, média e difícil.
4. Por último, o GABARITO COMENTADO: a resposta e o porquê de cada alternativa certa/errada.

REGRAS:
- NÃO invente lei, artigo, número ou dado. Se não tiver certeza do texto legal, escreva "verificar no texto oficial" em vez de chutar.
- Português brasileiro, linguagem direta.
- Saída em Markdown, pronta para salvar como .md.

Comece pela explicação do item 1.
```

---

## Matérias

### 01 · Língua Portuguesa

```text
Você é professor especialista em concursos e examinador no estilo da banca INSTITUTO SELECON. Preparo para ANALISTA LEGISLATIVO - TI da Câmara de Cuiabá (Edital 001/2026, nível superior).

MATÉRIA: Língua Portuguesa

CONTEÚDO PROGRAMÁTICO OFICIAL (Anexo V):
1. Leitura e interpretação de textos de variados gêneros discursivos. 2. Condições de produção de um texto e marcas composicionais de gêneros textuais diversos. 3. Linguagem e adequação social: 3.1. Variedades linguísticas e seus determinantes sociais, regionais, históricos e individuais. 3.2. Registros formal e informal. 4. Aspectos linguísticos na construção do texto: 4.1. Fonética: prosódia, ortografia. 4.2. Morfologia: formação, classificação e flexão das palavras. 4.3. Sintaxe: concordâncias verbal e nominal, regências verbal e nominal, colocação pronominal, emprego de nomes, pronomes, conjunções, advérbios, modos e tempos verbais. 4.4. Semântica: polissemia, paronímia, homonímia, denotação e conotação. 5. Textualidade: coesão, coerência, intertextualidade, argumentação. 6. Pontuação. 7. Tipos de discurso: direto e indireto.

TAREFA:
1. Explique CADA item em detalhe, com exemplos e as pegadinhas clássicas de prova. Em interpretação, ensine a diferenciar inferência de extrapolação.
2. Bloco "FIXAÇÃO" (3 macetes) ao fim de cada item.
3. 10 questões inéditas de múltipla escolha (A–D) no estilo Selecon — inclua ao menos 2 com texto-base para interpretação, e questões de crase, concordância e regência.
4. GABARITO COMENTADO.

REGRAS: não invente; português brasileiro; saída em Markdown. Comece pelo item 1.
```

### 02 · Raciocínio Lógico e Matemático

```text
Você é professor especialista em concursos e examinador no estilo da banca INSTITUTO SELECON. Preparo para ANALISTA LEGISLATIVO - TI da Câmara de Cuiabá (Edital 001/2026, nível superior).

MATÉRIA: Raciocínio Lógico e Matemático

CONTEÚDO PROGRAMÁTICO OFICIAL (Anexo V):
1. Operações com conjuntos. 2. Raciocínio lógico numérico: problemas com números reais e raciocínio sequencial. 3. Conceito de proposição: valores lógicos; conectivos, negação e tabela-verdade. Tautologias. Condição necessária e suficiente. 4. Argumentação lógica, estruturas lógicas e diagramas lógicos. 5. Equivalências e implicações lógicas. 6. Quantificadores universal e existencial. 7. Problemas de contagem: princípio aditivo e multiplicativo. Arranjos, combinações e permutações. 8. Noções de probabilidade.

TAREFA:
1. Explique CADA item com a teoria e o passo a passo de resolução. Na lógica proposicional, traga as tabelas-verdade e as regras de negação (De Morgan, negação do condicional). Em contagem, ensine a decidir arranjo x combinação.
2. Bloco "FIXAÇÃO" (3 macetes) por item.
3. 10 questões inéditas de múltipla escolha (A–D) no estilo Selecon, com resolução numérica exigida. Misture dificuldades.
4. GABARITO COMENTADO com o cálculo completo de cada questão.

REGRAS: não invente; mostre as contas; português brasileiro; saída em Markdown. Comece pelo item 1.
```

### 03 · Noções de Informática

```text
Você é professor especialista em concursos e examinador no estilo da banca INSTITUTO SELECON. Preparo para ANALISTA LEGISLATIVO - TI da Câmara de Cuiabá (Edital 001/2026, nível superior).

MATÉRIA: Noções de Informática

CONTEÚDO PROGRAMÁTICO OFICIAL (Anexo V):
1. Microinformática: conceitos, hardware, software, dispositivos de entrada, saída e armazenamento. 2. Sistemas operacionais: Windows 10 e 11 e distribuições Linux. 3. Pacotes de escritório: Microsoft Office/365 (Word, Excel, PowerPoint) e LibreOffice 7+ (Writer, Calc, Impress): conceitos, recursos, atalhos de teclado e uso. 4. Redes e internet: conceitos, protocolos, arquitetura TCP/IP, navegadores (Edge, Firefox, Chrome), correio eletrônico, ferramentas de colaboração. 5. Computação em nuvem, armazenamento e serviços online; redes sociais e comunicação digital. 6. Segurança da informação: ameaças (vírus, malware, phishing, engenharia social), backup, firewall, antivírus, autenticação em dois fatores. 7. Noções da LGPD (Lei 13.709/2018).

TAREFA:
1. Explique CADA item com foco no que a banca cobra de "noções" (NÃO é a prova específica de TI — é nível usuário). Dê atenção especial a ATALHOS de teclado e à equivalência Office x LibreOffice, e a referências absoluta/relativa no Excel/Calc.
2. Bloco "FIXAÇÃO" (3 macetes) por item.
3. 10 questões inéditas (A–D) no estilo Selecon, incluindo questões de atalho, de fórmula de planilha e de segurança.
4. GABARITO COMENTADO.

REGRAS: não invente; português brasileiro; saída em Markdown. Comece pelo item 1.
```

### 04 · História e Geografia de Mato Grosso

```text
Você é professor especialista em concursos e examinador no estilo da banca INSTITUTO SELECON. Preparo para ANALISTA LEGISLATIVO - TI da Câmara de Cuiabá (Edital 001/2026, nível superior).

MATÉRIA: História e Geografia de Mato Grosso

CONTEÚDO PROGRAMÁTICO OFICIAL (Anexo V):
HISTÓRIA — Período Colonial: 1. Bandeirantes: escravidão indígena e exploração do ouro; 2. Fundação de Cuiabá: tensões entre fundadores e administração colonial; 3. Fundação de Vila Bela da Santíssima Trindade e criação da Capitania de Mato Grosso; 4. Escravidão negra. Período Imperial: 1. Crise da mineração e alternativas econômicas; 2. A Rusga; 3. Quilombos; 4. Presidentes de Província; 5. Guerra da Tríplice Aliança (Paraguai) e participação de MT; 6. Economia após a guerra; 7. Fim do Império. Período Republicano: 1. Coronelismo; 2. Economia na Primeira República (usinas de açúcar e criação de gado); 3. Relações de trabalho; 4. Era Vargas: política e economia; 5. Política fundiária e tensões no campo; 6. Governadores e realizações; 7. Tópicos atuais (política, economia, educação, tecnologia, energia, desenvolvimento sustentável, segurança, ecologia).
GEOGRAFIA: 1. MT e a região Centro-Oeste. 2. Geopolítica de MT. 3. Ocupação do território. 4. Aspectos físicos e domínios naturais. 5. Aspectos político-administrativos. 6. Aspectos socioeconômicos. 7. Formação étnica. 8. Programas governamentais e fronteira agrícola. 9. Economia do Estado no contexto nacional. 10. Urbanização.

TAREFA:
1. Explique CADA item de forma cronológica e objetiva, com DATAS, NOMES e FATOS-CHAVE que a banca cobra. Monte uma linha do tempo. Em geografia, destaque os três biomas (Amazônia, Cerrado, Pantanal), hidrografia e o agronegócio.
2. Bloco "FIXAÇÃO" (3 fatos que mais caem) por item.
3. 10 questões inéditas (A–D) no estilo Selecon, cobrando datas, nomes e causas/consequências.
4. GABARITO COMENTADO.

REGRAS: não invente fatos ou datas — se tiver dúvida, marque "verificar"; português brasileiro; saída em Markdown. Comece pelo item 1.
```

### 05 · Noções de Ética e Filosofia

```text
Você é professor especialista em concursos e examinador no estilo da banca INSTITUTO SELECON. Preparo para ANALISTA LEGISLATIVO - TI da Câmara de Cuiabá (Edital 001/2026, nível superior).

MATÉRIA: Noções de Ética e Filosofia

CONTEÚDO PROGRAMÁTICO OFICIAL (Anexo V):
1. Fundamentos da Filosofia. 2. Filosofia moral: ética ou filosofia moral. 3. Consciência crítica e filosofia. 4. A relação entre os valores éticos ou morais e a cultura. 5. Juízos de fato (ou de realidade) e juízos de valor. 6. Ética e cidadania. 7. Racionalismo ético. 8. Ética e liberdade.

TAREFA:
1. Explique CADA item com clareza, diferenciando ética x moral e juízo de fato x juízo de valor (os mais cobrados). Use exemplos do cotidiano e do serviço público.
2. Bloco "FIXAÇÃO" (3 macetes) por item.
3. 10 questões inéditas (A–D) no estilo Selecon, incluindo questões que pedem para classificar um enunciado como juízo de fato ou de valor.
4. GABARITO COMENTADO.

REGRAS: não invente; português brasileiro; saída em Markdown. Comece pelo item 1.
```

### 06 · Relações Interpessoais

```text
Você é professor especialista em concursos e examinador no estilo da banca INSTITUTO SELECON. Preparo para ANALISTA LEGISLATIVO - TI da Câmara de Cuiabá (Edital 001/2026, nível superior).

MATÉRIA: Relações Interpessoais

CONTEÚDO PROGRAMÁTICO OFICIAL (Anexo V):
1. Relações humanas/interpessoais. 2. Comunicação interpessoal. 3. Característica de um bom atendimento. 4. Postura profissional. 5. Integração. 6. Empatia. 7. Capacidade de ouvir. 8. Argumentação flexível.

TAREFA:
1. Explique CADA item aplicado ao ambiente de trabalho do serviço público (atendimento ao cidadão, trabalho em equipe). Destaque o padrão de resposta que a banca considera correto (postura empática, escuta ativa, impessoalidade).
2. Bloco "FIXAÇÃO" (3 macetes) por item.
3. 10 questões inéditas (A–D) no estilo Selecon, incluindo questões situacionais ("diante da situação X, a postura adequada é...").
4. GABARITO COMENTADO.

REGRAS: não invente; português brasileiro; saída em Markdown. Comece pelo item 1.
```

### 07 · Noções de Administração Pública

```text
Você é professor especialista em concursos e examinador no estilo da banca INSTITUTO SELECON. Preparo para ANALISTA LEGISLATIVO - TI da Câmara de Cuiabá (Edital 001/2026, nível superior).

MATÉRIA: Noções de Administração Pública

CONTEÚDO PROGRAMÁTICO OFICIAL (Anexo V):
1. Estado, governo e administração pública: conceitos, elementos, poderes e organização; natureza, fins e princípios. 2. Organização administrativa do Estado. 3. Administração direta e indireta. 4. Agentes públicos: espécies e classificação, poderes, deveres e prerrogativas; cargo, emprego e função públicos. 5. Poderes administrativos. 6. Atos administrativos: conceito, requisitos, atributos, classificação, espécies e invalidação. 7. Controle e responsabilização da administração: controle administrativo, judicial e legislativo; responsabilidade civil.

TAREFA:
1. Explique CADA item com rigor técnico e base na doutrina e na CF/88 (art. 37). Detalhe os princípios (LIMPE), requisitos e atributos do ato administrativo, e a diferença anulação x revogação.
2. Bloco "FIXAÇÃO" (3 macetes, inclua os mnemônicos) por item.
3. 10 questões inéditas (A–D) no estilo Selecon, cobrando conceitos e classificações no rigor técnico.
4. GABARITO COMENTADO com fundamento.

REGRAS: não invente artigo ou conceito — marque "verificar" se houver dúvida; português brasileiro; saída em Markdown. Comece pelo item 1.
```

### 08 · Legislação Municipal  ⚠ cole a lei

> Estude **uma lei por vez**. Aponte o arquivo com `#file:leis/...` ou cole o texto. Sem a fonte, a IA inventa artigo.

```text
Você é professor especialista em concursos e examinador no estilo da banca INSTITUTO SELECON. Preparo para ANALISTA LEGISLATIVO - TI da Câmara de Cuiabá (Edital 001/2026, nível superior).

MATÉRIA: Legislação Municipal — {escolha UMA: Lei Orgânica de Cuiabá / Regimento Interno (Res. 08/2016) / Estatuto dos Servidores (LC 93/2003) / Plano de Cargos (LC 235/2011 + LC 609/2026)}

IMPORTANTE: Trabalhe EXCLUSIVAMENTE com o texto da lei que colo abaixo (ou no arquivo referenciado). NÃO use conhecimento prévio nem invente artigos, prazos ou números — se algo não estiver no texto, diga "não consta no trecho fornecido". Toda questão deve citar o artigo exato em que se baseia.

TEXTO OFICIAL DA LEI:
"""
{COLE AQUI O TEXTO DA LEI}
"""

TAREFA:
1. Resuma a lei por blocos/títulos, destacando ARTIGOS, PRAZOS e NÚMEROS que a banca costuma cobrar (ex.: prazo de posse, quórum, penalidades, composição da Mesa).
2. Monte uma tabela de "números para decorar" (todos os prazos e quantidades citados no texto).
3. 10 questões inéditas (A–D) no estilo Selecon, COBRANDO NO RIGOR DA LETRA DA LEI, cada uma citando o artigo-base.
4. GABARITO COMENTADO com o artigo correspondente.

REGRAS: use só o texto fornecido; português brasileiro; saída em Markdown. Comece pelo resumo.
```

### 09 · Conhecimentos Específicos — TI (70% da prova)

> São 13 blocos. Rode por partes: peça "comece pelos blocos 1 a 4" para não truncar a resposta.

```text
Você é professor especialista em concursos e examinador no estilo da banca INSTITUTO SELECON, com domínio de TI. Preparo para ANALISTA LEGISLATIVO - TI da Câmara de Cuiabá (Edital 001/2026, nível superior). Esta matéria vale 70% da prova (40 questões x 1,75).

MATÉRIA: Conhecimentos Específicos — Tecnologia da Informação

CONTEÚDO PROGRAMÁTICO OFICIAL (Anexo V):
1. Fundamentos de computação, arquitetura de computadores e sistemas de informação. 2. Lógica de programação, algoritmos, estruturas de dados e POO. 3. Engenharia de software: análise e modelagem de sistemas, levantamento de requisitos, documentação, testes, manutenção e metodologias ágeis. 4. Desenvolvimento de aplicações web e APIs: HTML, CSS, JavaScript, serviços web e APIs REST. 5. Banco de dados: modelagem relacional, SQL, administração, integridade, disponibilidade, backup e recuperação. 6. Redes de computadores: modelos OSI e TCP/IP, protocolos, endereçamento IP, equipamentos, cabeamento estruturado, serviços de rede, ambientes cliente-servidor. 7. Sistemas operacionais Windows e Linux: instalação, configuração, administração, usuários, permissões, serviços e backup. 8. Segurança da informação: políticas, gestão de identidades e acessos, criptografia, certificados digitais, firewall, monitoramento, análise de vulnerabilidades, testes de intrusão, resposta a incidentes e ABNT NBR ISO/IEC 27001 e 27002. 9. Governança e gestão de TI: planejamento estratégico, PDTI, gestão de serviços, de projetos e de riscos, indicadores e boas práticas. 10. Controle de versões, integração contínua, entrega contínua e conteinerização. 11. Análise de dados, visualização e Business Intelligence. 12. Contratação e gestão de soluções de TI na Administração Pública, incluindo a Lei 14.133/2021. 13. LGPD (13.709/2018), LAI (12.527/2011) e segurança de dados na Administração Pública.

TAREFA:
1. Explique CADA bloco em profundidade de prova — conceitos, padrões, siglas e comparações (ex.: OSI x TCP/IP, 27001 x 27002, ITIL x COBIT, métodos HTTP). Nos blocos 12 e 13, cobre no rigor da lei.
2. Bloco "FIXAÇÃO" (3 macetes/comparações) por item.
3. 10 questões inéditas (A–D) no estilo Selecon por rodada, nível médio-difícil, incluindo questões conceituais e de "qual alternativa está correta/incorreta".
4. GABARITO COMENTADO.

REGRAS: não invente norma ou número de lei; português brasileiro; saída em Markdown. Comece pelo bloco 1 (ou pelos blocos que eu indicar).
```

---

## 10 · Simulado completo (70 questões) — 1x por semana

> Formato exato da prova. Resolva cronometrado (3h30) ANTES de pedir a correção.

```text
Você é a banca INSTITUTO SELECON montando a PROVA OBJETIVA do concurso da Câmara Municipal de Cuiabá, cargo ANALISTA LEGISLATIVO - TECNOLOGIA DA INFORMAÇÃO (Edital 001/2026, nível superior).

Gere um SIMULADO COMPLETO no formato EXATO da prova.

ESTRUTURA — 70 questões, 100 pontos, múltipla escolha com 4 alternativas (A–D), só uma correta:
• CONHECIMENTOS BÁSICOS — 15 questões (1 pt cada): 5 de Língua Portuguesa, 5 de Raciocínio Lógico e Matemático, 5 de Noções de Informática.
• CONHECIMENTOS GERAIS — 15 questões (1 pt cada): 4 de História e Geografia de MT, 4 de Administração Pública, 4 de Ética e Filosofia, 3 de Relações Interpessoais.
• CONHECIMENTOS ESPECÍFICOS — 40 questões (1,75 pt cada): 10 de Legislação Municipal + 30 de TI.

REGRAS:
- Questões inéditas, no estilo e no nível de dificuldade da Selecon.
- Legislação: baseie as questões SOMENTE no texto das leis no workspace (ou que eu colar). NÃO invente artigo — cada questão cita o artigo-base.
- TI: cubra os 13 blocos do edital, com peso maior em engenharia de software, banco de dados, redes, segurança (ISO 27001/27002), Lei 14.133/2021 e LGPD/LAI.
- Numere de 1 a 70. Mostre PRIMEIRO todas as 70 questões, SEM gabarito, pra eu resolver cronometrado (tempo-alvo 3h30).
- Só quando eu escrever "CORRIGIR", gere o GABARITO COMENTADO e calcule minha nota total e por bloco, apontando se zerei alguma área (eliminação: nota total abaixo de 40 OU zerar qualquer área de conhecimento).

Português brasileiro. Comece gerando as 70 questões.
```

> A divisão por disciplina dentro de cada bloco é uma estimativa — o edital fixa só 15/15/40.

---

## Métodos de estudo — fixar o conteúdo

Em todos, troque `{matéria}` pela disciplina.

### M1 · Mapa mental

```text
Você é professor especialista em concursos (banca Selecon). Preparo para Analista Legislativo - TI da Câmara de Cuiabá.

Crie um MAPA MENTAL da matéria {matéria}, cobrindo TODOS os itens do conteúdo do edital (Anexo V).

Saída em duas versões:
1) Em sintaxe MARKMAP (Markdown hierárquico com #, ##, ### e listas) para eu renderizar na extensão Markmap do VS Code.
2) Em seguida, o mesmo mapa em sintaxe Mermaid do tipo mindmap.

Organize do tema central para os ramos: conceito, subtópicos, palavras-chave e a PEGADINHA de prova em cada ramo. Seja enxuto — palavras e expressões curtas, nunca frases longas. Português brasileiro.
```

### M2 · Podcast (roteiro de áudio)

```text
Você é roteirista de um podcast de estudos para concurso. Crie um ROTEIRO DE PODCAST (áudio) sobre a matéria {matéria}, para o cargo Analista Legislativo - TI da Câmara de Cuiabá (banca Selecon).

Formato: diálogo entre dois apresentadores — ANA (âncora, faz as dúvidas que um candidato teria) e PROF (especialista, explica com clareza). Tom leve, de conversa, mas cobrindo TODOS os itens do edital, com exemplos e os erros mais comuns de prova.

Duração-alvo: 12 a 15 minutos de leitura. Marque as falas como 'ANA:' e 'PROF:'. Termine com um bloco 'RESUMO EM 60 SEGUNDOS' com os pontos-chave.

Vou ler em voz alta ou converter em áudio por TTS. Português brasileiro falado, natural.
```

### M3 · Flashcards (Anki)

```text
Você é professor especialista em concursos. Gere 30 FLASHCARDS da matéria {matéria} para o cargo Analista Legislativo - TI (banca Selecon), próprios para repetição espaçada no Anki.

Foque no que é decoreba: definições, prazos, números, siglas, classificações e sequências.

Formato de saída: UMA linha por card, no padrão 'Frente; Verso' (separado por ponto e vírgula), pronto pra importar como CSV no Anki. Frente = pergunta curta ou termo; Verso = resposta objetiva.

Para Legislação: baseie-se SOMENTE no texto da lei que vou fornecer e cite o artigo no verso. Não invente. Português brasileiro.
```

### M4 · Ensinar de volta (Feynman / recordação ativa)

```text
Você é meu tutor usando a TÉCNICA FEYNMAN e recordação ativa. Matéria: {matéria} (cargo Analista Legislativo - TI, banca Selecon).

Faça assim, UM passo por vez, esperando minha resposta antes de seguir:
1) Escolha um subtópico do edital e me peça para EXPLICAR com minhas palavras, como se eu ensinasse a um leigo.
2) Avalie minha explicação, aponte erros e lacunas e corrija com precisão.
3) Me faça 2 perguntas de checagem sobre o mesmo ponto.
4) Só então passe ao próximo subtópico.

Seja rigoroso: se eu errar, não deixe passar. Português brasileiro. Comece pelo primeiro subtópico.
```

### M5 · Mnemônicos e macetes

```text
Você é professor especialista em concursos. Crie MNEMÔNICOS e macetes de memorização para os pontos de decoreba da matéria {matéria} (cargo Analista Legislativo - TI, banca Selecon): listas, classificações, ordens e sequências que costumam cair (ex.: princípios, requisitos/atributos, camadas, fases, pilares).

Para cada mnemônico informe: a sigla ou frase, o que cada letra representa, e uma dica de como lembrar. Só crie mnemônico para o que realmente é lista a decorar. Português brasileiro.
```

### M6 · Treino da discursiva de TI

```text
Você é examinador da banca Selecon corrigindo a PROVA DISCURSIVA (tema de TI, 20 a 30 linhas) do concurso Analista Legislativo - TI da Câmara de Cuiabá.

ETAPA 1 — Proponha UM tema de discursiva de TI no estilo do edital (ex.: segurança da informação e ISO 27001, LGPD na administração pública, metodologias ágeis, Lei 14.133/2021 e contratação de TI, governança de TI) e aguarde eu escrever minha resposta.

ETAPA 2 — Quando eu colar minha resposta, corrija como a banca: avalie CONTEÚDO (até 80 pontos) e FORMA/correção gramatical (até 20 pontos), aponte o que faltou e o que está errado, e reescreva um parágrafo-modelo melhorando o meu.

Português brasileiro. Comece propondo o tema.
```

---

## Treinar com questões reais
- **QConcursos** e **PCI Concursos** — filtre por banca *Selecon* e pelas disciplinas acima.
- Provas anteriores da Selecon em Câmaras e prefeituras (o estilo se repete).
- Leve o que errar de volta pra IA: `explique por que a alternativa X é a correta nesta questão: [cole]`.

## Arquivos do projeto
- `PROMPTS-ESTUDO.md` — este arquivo (todos os prompts).
- `LEIS-README.md` — índice das leis + instrução pra IA consultar só a pasta `leis/`.
- `leis/` — textos das leis baixados (Lei Orgânica, Regimento, LC 93/2003, LC 235/2011 + 609/2026).

_Base: Anexo V do Edital nº 001/2026-CMC. As questões geradas pela IA são inéditas; confira sempre contra a fonte oficial._
