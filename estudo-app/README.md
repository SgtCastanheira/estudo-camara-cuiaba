# Estudo · Câmara de Cuiabá (Analista Legislativo – TI)

App de estudo em Angular + Angular Material, responsivo (celular, tablet e desktop).
O conteúdo vem das apostilas em Markdown da pasta `2° parte` (disciplinas 01 a 09).

## Rodar

```bash
npm install        # só na primeira vez
npm start          # http://localhost:4200
npm run build      # gera dist/estudo-app/browser (hospedagem estática)
```

Para abrir no celular durante o desenvolvimento (mesma rede Wi-Fi):

```bash
npx ng serve --host 0.0.0.0
```

e acesse `http://IP-DO-COMPUTADOR:4200` no aparelho.

## Instalar no celular e usar offline (PWA)

O app é um PWA: depois de aberto **uma vez com internet**, ele guarda tudo (conteúdo, fontes,
ícones) no aparelho e funciona sem conexão. O progresso fica salvo no próprio aparelho.

Isso só funciona com o app **publicado em HTTPS** (veja abaixo). Com o app publicado:

- **Android (Chrome):** menu ⋮ → *Instalar app* (ou *Adicionar à tela inicial*).
- **iPhone (Safari):** botão Compartilhar → *Adicionar à Tela de Início*.
- **Computador (Chrome/Edge):** ícone de instalar na barra de endereço.

Quando você publicar uma versão nova (por exemplo, depois de editar um `.md`), o app avisa
*"Nova versão do conteúdo disponível"* com o botão **Atualizar**.

## Publicar (hospedagem estática)

`npm run build` gera a pasta `dist/estudo-app/browser`: são só arquivos estáticos, qualquer
hospedagem serve. Opções gratuitas:

- **Netlify** (mais simples): em <https://app.netlify.com/drop>, arraste a pasta
  `dist/estudo-app/browser`. O arquivo `_redirects` já faz os links diretos
  (`/disciplina/ti`) funcionarem.
- **Cloudflare Pages:** também lê o `_redirects`. Comando de build `npm run build`, pasta de saída
  `dist/estudo-app/browser`.
- **GitHub Pages:** o app fica em `usuario.github.io/<repositorio>/`, então compile com
  `npx ng build --base-href /<repositorio>/` e copie `index.html` para `404.html` (fallback das rotas).
- **Firebase Hosting / Vercel:** configure um *rewrite* de `**` para `/index.html`.

Atenção: quem tiver o link consegue abrir o app e ler todo o conteúdo dos `.md`.

## Conteúdo: os .md são a fonte

`npm start` e `npm run build` rodam antes o gerador `scripts/gerar-conteudo.mjs`, que lê os `.md`
da pasta `2° parte` e escreve `src/app/data/conteudo.gerado.ts` (**não edite esse arquivo à mão**).

Para atualizar o app depois de editar um `.md`: reinicie o `npm start` ou rode `npm run conteudo`.

O gerador usa o cabeçalho de cada `.md` (`slug`, `peso`) e o padrão abaixo. Se algum arquivo
fugir do padrão, ele **para com uma mensagem de erro** (arquivo + questão) em vez de gerar
conteúdo errado.

```markdown
---
slug: rlm            # id da disciplina (o nome do arquivo não importa)
peso: medio          # facil | medio | alto | critico (opcional)
questoes: 10
---
# 02 · Título
Texto de introdução (aparece no topo da aba "Estudar").

## 1. Um tópico                    # cada "##" vira um painel; "###" fica dentro dele
- texto em Markdown (listas, **negrito**, tabelas…)

> **FIXAÇÃO**                      # ou  > **FIXAÇÃO (rótulo opcional)**
> 1. macete

## 10 questões no estilo Selecon
**1.** Enunciado
a) ... b) ... c) ... d) ...        # na mesma linha ou uma por linha

### GABARITO COMENTADO
1. **(b)** Comentário
```

Só são lidos arquivos que tenham `slug:` no cabeçalho. Outra pasta de `.md`:
`node scripts/gerar-conteudo.mjs "<pasta>"`.

## O que tem

- **PWA:** instalável na tela inicial, funciona offline, fontes e ícones hospedados com o app
  (nenhuma requisição a terceiros).

- **Início:** contagem regressiva para a prova (13/12/2026), progresso geral e cards por disciplina.
- **Disciplina → Estudar:** tópicos em sanfona, bloco "Fixação" e botão "Marcar como estudado".
- **Disciplina → Questões:** uma questão por vez, correção imediata com comentário, nota final,
  revisão dos erros e "Refazer só as erradas".
- **Menu:** fixo no desktop; gaveta no celular e no tablet em pé.
- **Tema:** automático (do sistema), claro ou escuro.
- **Progresso:** salvo no próprio navegador (`localStorage`), sem servidor nem login.

## Adicionar uma disciplina nova

1. Crie o `.md` no formato acima, com um `slug` novo, e coloque-o em `2° parte`.
2. Se o `slug` ainda não existir na lista `DISCIPLINAS` em `src/app/data/disciplinas.ts`,
   acrescente a linha (nome, ícone, área, nº estimado de questões).

## Estrutura

```
scripts/        gerar-conteudo.mjs  (.md -> conteudo.gerado.ts)
public/         manifest.webmanifest, icons/, _redirects   (PWA e hospedagem)
ngsw-config.json   o que o service worker guarda para o modo offline
src/app/
  data/         modelos, lista de disciplinas e conteudo.gerado.ts (gerado dos .md)
  services/     progresso.service.ts (localStorage + tema)
  components/   quiz e renderizador de Markdown
  pages/        home e disciplina
```
