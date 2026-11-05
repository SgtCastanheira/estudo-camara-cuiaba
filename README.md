# Estudo · Câmara de Cuiabá — Analista Legislativo (TI)

Material de estudo e app para o concurso da Câmara Municipal de Cuiabá (Edital 001/2026-CMC,
banca Instituto Selecon, prova em 13/12/2026).

**App:** https://sgtcastanheira.github.io/estudo-camara-cuiaba/
— abre no celular, instala na tela inicial e funciona offline depois do primeiro acesso.

## O que tem aqui

| Pasta / arquivo | O quê |
|---|---|
| `2° parte/` | As apostilas em Markdown (disciplinas 01 a 09): tópicos, fixação, questões e gabarito. **É a fonte do conteúdo do app.** |
| `estudo-app/` | O app (Angular + Angular Material, PWA). Veja o [README do app](estudo-app/README.md). |
| `PROMPTS-ESTUDO.md`, `LEIS-README.md` | Prompts de estudo e orientação sobre as leis municipais. |
| `01-portugues.md` | Versão antiga da apostila de Português (a atual está em `2° parte/`). |

## Atualizar o conteúdo

1. Edite o `.md` em `2° parte/`.
2. `git add -A && git commit -m "..." && git push`
3. O GitHub recompila e republica o site sozinho (cerca de 2 minutos, aba **Actions**).
4. No celular, o app avisa *"Nova versão do conteúdo disponível"*: toque em **Atualizar**.

## Rodar no computador

```bash
cd estudo-app
npm install
npm start        # http://localhost:4200
```

> O progresso de estudo fica salvo no próprio navegador/aparelho (não vai para o GitHub).
