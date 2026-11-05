# Legislação Municipal — Concurso Câmara de Cuiabá (Analista Legislativo - TI)

> **Instrução para a IA (Copilot/Claude no VS Code):**
> Ao responder QUALQUER questão de Legislação Municipal, consulte **exclusivamente** os
> arquivos de lei desta pasta (`leis/`). **Não use conhecimento prévio** e **não invente**
> artigos, prazos ou números. Toda afirmação ou questão deve **citar o artigo exato** do
> texto. Se algo não constar nos arquivos, responda: *"não consta no texto fornecido"*.

---

## Leis a baixar (versão consolidada/atualizada)

Baixe cada uma e salve nesta pasta como `.pdf` ou, melhor para a IA ler, `.txt`/`.md`.

### 1. Lei Orgânica do Município de Cuiabá
- **Onde:** Portal da Câmara Municipal de Cuiabá → seção *Legislação* (`camaracuiaba.mt.gov.br`)
  ou busque "Lei Orgânica Cuiabá" no `leismunicipais.com.br` (texto consolidado, com alterações).
- **Salvar como:** `leis/01-lei-organica-cuiaba.txt`

### 2. Regimento Interno da Câmara (Resolução nº 08, de 15/12/2016)
- **Onde:** Portal da Câmara Municipal de Cuiabá → *Legislação / Regimento Interno*.
  Confirme que é a **Resolução nº 08/2016** e pegue a versão com alterações posteriores.
- **Salvar como:** `leis/02-regimento-interno-res-08-2016.txt`

### 3. Lei Complementar nº 93, de 23/06/2003 — Estatuto dos Servidores
- **Onde:** Portal da Câmara / Prefeitura de Cuiabá → *Legislação*, ou `leismunicipais.com.br`.
  Pegue o texto **consolidado** (com todas as alterações até 2026).
- **Salvar como:** `leis/03-lc-93-2003-estatuto-servidores.txt`

### 4. Lei Complementar nº 235, de 03/06/2011 — Plano de Cargos, Carreiras e Vencimentos
- **Onde:** Portal da Câmara Municipal de Cuiabá → *Legislação*.
- **Importante:** baixe junto a **LC nº 609/2026**, que ALTERA a 235/2011 (criou o cargo de TI,
  atribuições e novos quantitativos). A 609/2026 está publicada na **Gazeta Municipal de Cuiabá,
  edição de 03/07/2026** (`gazetamunicipal.cuiaba.mt.gov.br`).
- **Salvar como:** `leis/04-lc-235-2011-plano-de-cargos.txt` e `leis/04b-lc-609-2026-alteracoes.txt`

---

## Como usar no VS Code

1. Crie a pasta `leis/` no workspace e coloque os arquivos acima.
2. No chat da IA, referencie o arquivo da lei que vai estudar — ex.: `#file:leis/03-lc-93-2003-estatuto-servidores.txt`.
3. Cole o **prompt 08 (Legislação)** do kit de prompts e peça as questões.
4. A IA vai gerar questões citando os artigos reais — sem alucinação.

> Converter PDF em texto: abra o PDF, copie o conteúdo e cole num `.txt`, ou use um conversor.
> Texto puro é mais confiável para a IA ler do que PDF escaneado.

---

## Prioridade de estudo (rende mais questão objetiva)
1. **Estatuto dos Servidores (LC 93/2003)** — prazos, deveres, penalidades, PAD.
2. **Regimento Interno (Res. 08/2016)** — Mesa, comissões, sessões, processo legislativo.
3. **Lei Orgânica** — organização dos Poderes, competências, processo legislativo municipal.
4. **Plano de Cargos (LC 235/2011 + 609/2026)** — carreira, cargo de TI, jornada.

_Base: Edital nº 001/2026-CMC, Anexo V. Confira sempre a versão oficial e vigente de cada lei._
