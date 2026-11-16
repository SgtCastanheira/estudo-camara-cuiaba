/**
 * Conteúdo da página "Guia do concurso": estrutura da prova, estratégia, onde achar o conteúdo
 * e como treinar. Fontes: edital nº 001/2026-CMC e o guia de estudos do projeto (MATERIAIS.md).
 *
 * Os links de tipo "oficial" e "estudo" foram encontrados em pesquisa (16/11/2026) e não foram
 * abertos um a um. Os de tipo "busca" são pesquisas prontas no Google para o que não achei com
 * link direto confiável. Páginas mudam de endereço: confira sempre a fonte oficial.
 */

export type TipoLink = 'oficial' | 'estudo' | 'busca';

export interface Link {
  rotulo: string;
  url: string;
  tipo: TipoLink;
}

export interface Recurso {
  titulo: string;
  descricao: string;
  links: Link[];
}

export interface GrupoMaterial {
  id: string;
  titulo: string;
  icone: string;
  intro?: string;
  recursos: Recurso[];
}

export const ROTULO_LINK: Record<TipoLink, string> = {
  oficial: 'Fonte oficial',
  estudo: 'Material de estudo',
  busca: 'Pesquisa pronta',
};

const busca = (rotulo: string, consulta: string): Link => ({
  rotulo,
  url: `https://www.google.com/search?q=${encodeURIComponent(consulta)}`,
  tipo: 'busca',
});

// ------------------------------------------------------------------ estrutura da prova

export const LINHAS_PROVA = [
  {
    area: 'Conhecimentos Básicos',
    disciplinas: 'Língua Portuguesa; Raciocínio Lógico e Matemático; Noções de Informática',
    questoes: 15,
    pontos: '1,00',
    total: 15,
  },
  {
    area: 'Conhecimentos Gerais',
    disciplinas:
      'História e Geografia de MT; Ética e Filosofia; Relações Interpessoais; Noções de Administração Pública',
    questoes: 15,
    pontos: '1,00',
    total: 15,
  },
  {
    area: 'Conhecimentos Específicos',
    disciplinas: 'Legislação + Disciplina específica (TI)',
    questoes: 40,
    pontos: '1,75',
    total: 70,
  },
];

export const REGRAS_PROVA: { icone: string; titulo: string; texto: string }[] = [
  {
    icone: 'quiz',
    titulo: 'Etapas',
    texto:
      'A 1ª etapa é a prova objetiva (70 questões, 100 pontos) e a 2ª é a prova discursiva, aplicadas no mesmo dia. Para os cargos de nível superior há ainda avaliação de títulos (classificatória).',
  },
  {
    icone: 'rule',
    titulo: 'Aprovação na objetiva',
    texto:
      'Mínimo de 40 pontos (40%) e não zerar nenhuma das três áreas. Quem não atingir é eliminado.',
  },
  {
    icone: 'edit_note',
    titulo: 'Prova discursiva',
    texto:
      'Tema de conhecimento específico do cargo (TI), resposta de 20 a 30 linhas, vale 100 pontos (80 de conteúdo e 20 de correção formal). Só é corrigida para quem foi habilitado na objetiva e ficou classificado até 20 vezes o número de vagas (mais empatados). Sem consulta.',
  },
];

// ------------------------------------------------------------------ estratégia

export interface PassoEstrategia {
  titulo: string;
  texto: string;
  /** Ids de disciplinas do app (rota /disciplina/:id). */
  disciplinas: string[];
}

export const ESTRATEGIA: PassoEstrategia[] = [
  {
    titulo: 'TI e Legislação municipal (específicos)',
    texto:
      'Maior peso: 70 dos 100 pontos, 1,75 por questão. A Legislação (4 normas municipais) tende a ter poucas questões, mas é decoreba de ponto certo; vale garantir.',
    disciplinas: ['ti', 'legislacao'],
  },
  {
    titulo: 'Noções de Informática (básicos)',
    texto:
      'Para você é ponto quase gratuito. Cuidado só com o recorte "usuário": Office e LibreOffice, atalhos.',
    disciplinas: ['informatica'],
  },
  {
    titulo: 'Raciocínio Lógico e Língua Portuguesa',
    texto: 'Alto retorno, porque dá para treinar com questões.',
    disciplinas: ['rlm', 'portugues'],
  },
  {
    titulo: 'Conhecimentos Gerais',
    texto:
      'História, Geografia de MT, Ética, Relações Interpessoais e Administração Pública. Não dá para zerar nenhuma área, então não ignore; História e Geografia de MT exigem memória local.',
    disciplinas: ['mato-grosso', 'etica', 'relacoes', 'adm-publica'],
  },
];

export const REGRA_DE_OURO =
  'Como não pode zerar nenhuma área, distribua o estudo, mas concentre a maior carga nos específicos de TI. A discursiva também é de TI, então dominar o conteúdo específico resolve as duas etapas.';

// ------------------------------------------------------------------ onde achar o conteúdo

export const MATERIAIS: GrupoMaterial[] = [
  {
    id: 'legislacao',
    titulo: 'Legislação municipal',
    icone: 'gavel',
    intro:
      'Prioridade alta: é cobrada na letra da lei, e o texto oficial é a única fonte confiável. Baixe cada norma em PDF e suba no NotebookLM.',
    recursos: [
      {
        titulo: 'Edital 001/2026-CMC',
        descricao: 'Conteúdo programático oficial e regras da prova.',
        links: [
          {
            rotulo: 'Edital (PDF)',
            url: 'https://arquivos.qconcursos.com/regulamento/arquivo/102705/camara-de-cuiaba-mt-2026-edital-n-1-edital.pdf',
            tipo: 'oficial',
          },
        ],
      },
      {
        titulo: 'Lei Orgânica do Município de Cuiabá (1990)',
        descricao:
          'Não achei o texto integral. Atenção: o PDF da pasta de emendas no portal é só uma proposta de emenda ao art. 8º, não a lei.',
        links: [
          {
            rotulo: 'Portal legislativo da Câmara',
            url: 'https://legislativo.camaracuiaba.mt.gov.br',
            tipo: 'oficial',
          },
          busca('Buscar o texto', 'Lei Orgânica do Município de Cuiabá texto atualizado'),
        ],
      },
      {
        titulo: 'Regimento Interno (Resolução nº 08, de 15/12/2016)',
        descricao:
          'Texto integral não encontrado. Há um projeto de resolução de 2026 mudando o art. 23 (eleição da Mesa Diretora): veja se foi aprovado.',
        links: [
          {
            rotulo: 'Portal legislativo da Câmara',
            url: 'https://legislativo.camaracuiaba.mt.gov.br',
            tipo: 'oficial',
          },
          busca('Buscar o texto', 'Regimento Interno Câmara Municipal de Cuiabá Resolução 08/2016'),
        ],
      },
      {
        titulo: 'LC nº 93/2003 — Estatuto dos Servidores',
        descricao: 'Procure no portal da Câmara ou da Prefeitura de Cuiabá.',
        links: [busca('Buscar o texto', 'Lei Complementar 93/2003 Cuiabá estatuto dos servidores')],
      },
      {
        titulo: 'LC nº 235/2011 e LC nº 609/2026 — Plano de Cargos',
        descricao:
          'A LC 609/2026 (03/07/2026) criou parte dos cargos e alterou a LC 235. O texto dela não apareceu nas buscas.',
        links: [
          busca('Buscar a LC 235', 'Lei Complementar 235/2011 Cuiabá plano de cargos Câmara'),
          busca('Buscar a LC 609', 'Lei Complementar 609/2026 Cuiabá Câmara Municipal'),
        ],
      },
    ],
  },
  {
    id: 'ti-gestao',
    titulo: 'TI: gestão e legislação',
    icone: 'policy',
    intro: 'Cai muito em prova de Câmara. Use sempre o texto compilado, porque as leis foram alteradas.',
    recursos: [
      {
        titulo: 'Lei 14.133/2021 — Licitações e Contratos',
        descricao: 'Aplicada a TI. Tem alterações recentes.',
        links: [
          {
            rotulo: 'Planalto',
            url: 'https://www.planalto.gov.br/ccivil_03/_Ato2019-2022/2021/Lei/L14133.htm',
            tipo: 'oficial',
          },
          { rotulo: 'Senado', url: 'https://legis.senado.leg.br/norma/33382036', tipo: 'oficial' },
        ],
      },
      {
        titulo: 'LGPD — Lei 13.709/2018',
        descricao: 'Confira o texto compilado, com as alterações da Lei 13.853/2019 (criou a ANPD).',
        links: [
          {
            rotulo: 'Planalto',
            url: 'https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/Lei/L13709.htm',
            tipo: 'oficial',
          },
        ],
      },
      {
        titulo: 'LAI — Lei 12.527/2011',
        descricao: 'Transparência é a regra, sigilo é exceção.',
        links: [
          {
            rotulo: 'Planalto',
            url: 'https://planalto.gov.br/ccivil_03/_Ato2011-2014/2011/Lei/L12527.htm',
            tipo: 'oficial',
          },
        ],
      },
      {
        titulo: 'PDTIC — Plano Diretor de TIC',
        descricao: 'Guia do SISP (versões 2.0 e 2.1). Para a versão vigente, busque no gov.br.',
        links: [
          {
            rotulo: 'Guia de PDTIC v2.0 (PDF)',
            url: 'https://tic.fiocruz.br/sites/default/files/2020-05/Guia_de_PDTIC_do_SISP_v2.0.pdf',
            tipo: 'estudo',
          },
        ],
      },
      {
        titulo: 'ITIL 4, COBIT 2019 e PMBOK',
        descricao: 'Os guias oficiais são pagos. Para prova, basta resumo de concurso.',
        links: [
          busca('ITIL 4', 'ITIL 4 resumo para concurso'),
          busca('COBIT 2019', 'COBIT 2019 domínios EDM APO BAI DSS MEA resumo concurso'),
          busca('PMBOK', 'PMBOK resumo grupos de processos áreas de conhecimento concurso'),
        ],
      },
    ],
  },
  {
    id: 'ti-tecnico',
    titulo: 'TI: conteúdo técnico',
    icone: 'terminal',
    recursos: [
      {
        titulo: 'Programação e estruturas de dados',
        descricao:
          'CS50 em português: versão não oficial (CC50), traduzida pela Fundação Estudar. O conteúdo é gratuito; o certificado costuma ser pago. Confirme se as inscrições estão abertas.',
        links: [
          {
            rotulo: 'CC50 (CS50 em português)',
            url: 'https://napratica.org.br/curso-de-harvard-traduzido-cc50',
            tipo: 'estudo',
          },
        ],
      },
      {
        titulo: 'Engenharia de software e ágil',
        descricao: 'Scrum Guide 2020 em português (BR).',
        links: [
          {
            rotulo: 'Scrum Guide 2020 (PDF)',
            url: 'https://ScrumGuides.org/docs/scrumguide/v2020/2020-Scrum-Guide-PortugueseBR-3.0.pdf',
            tipo: 'oficial',
          },
        ],
      },
      {
        titulo: 'Git',
        descricao: 'Livro Pro Git em português (a tradução tem trechos ainda em inglês).',
        links: [
          { rotulo: 'Pro Git (PT-BR)', url: 'https://git-scm.com/book/pt-br/v2', tipo: 'oficial' },
        ],
      },
      {
        titulo: 'Web e APIs REST',
        descricao: 'MDN Web Docs: métodos HTTP e códigos de status.',
        links: [
          busca('Métodos HTTP (MDN)', 'HTTP request methods MDN'),
          busca('Códigos de status (MDN)', 'HTTP response status codes MDN'),
        ],
      },
      {
        titulo: 'Segurança da informação',
        descricao:
          'Cartilha de Segurança para Internet do CERT.br. A norma ISO 27001/27002 é paga: use resumos de concurso.',
        links: [
          {
            rotulo: 'Cartilha CERT.br (PDF)',
            url: 'https://cartilha.cert.br/livro/cartilha-seguranca-internet.pdf',
            tipo: 'oficial',
          },
          { rotulo: 'Fascículos', url: 'https://cartilha.cert.br/fasciculos/', tipo: 'oficial' },
          busca('ISO 27001/27002', 'ISO 27001 27002 resumo concurso'),
        ],
      },
      {
        titulo: 'Banco de dados, redes, sistemas operacionais, DevOps e BI',
        descricao:
          'Documentação oficial (PostgreSQL, Microsoft Learn, Docker) e canais de concurso para redes.',
        links: [
          busca('PostgreSQL', 'PostgreSQL documentação em português SQL'),
          busca('Redes (OSI/TCP-IP)', 'OSI TCP/IP sub-redes aula concurso'),
          busca('Docker', 'docs.docker.com get started'),
          busca('Power BI', 'Microsoft Learn Power BI introdução'),
        ],
      },
    ],
  },
  {
    id: 'basicos',
    titulo: 'Conhecimentos Básicos',
    icone: 'menu_book',
    recursos: [
      {
        titulo: 'Língua Portuguesa',
        descricao:
          'Gramática normativa para consulta e questões por assunto, filtrando pela banca Selecon.',
        links: [busca('Aulas de português para concurso', 'português para concurso interpretação concordância regência aula')],
      },
      {
        titulo: 'Raciocínio Lógico e Matemático',
        descricao: 'Lógica proposicional, diagramas lógicos, contagem e probabilidade.',
        links: [busca('Aulas de lógica', 'raciocínio lógico concurso proposições tabela-verdade aula')],
      },
      {
        titulo: 'Noções de Informática (usuário)',
        descricao:
          'O recorte é de usuário: Office e LibreOffice, atalhos, Windows e navegadores. Pratique no computador.',
        links: [busca('Informática para concurso', 'informática para concursos Windows Word Excel atalhos aula')],
      },
    ],
  },
  {
    id: 'gerais',
    titulo: 'Conhecimentos Gerais',
    icone: 'public',
    recursos: [
      {
        titulo: 'História de Mato Grosso',
        descricao:
          'Artigos acadêmicos gratuitos (UFMT, UNEMAT, IHGMT). São artigos, não resumos de concurso: use para entender e a apostila para memorizar.',
        links: [
          {
            rotulo: 'Revista Territórios & Fronteiras (UFMT)',
            url: 'https://periodicoscientificos.ufmt.br/territoriosefronteiras/index.php/v03n02/article/download/168/141/385',
            tipo: 'estudo',
          },
          busca('Rusga 1834', 'Rusga 1834 Mato Grosso artigo'),
          busca('Capitania de Mato Grosso', 'Capitania de Mato Grosso Vila Bela artigo'),
        ],
      },
      {
        titulo: 'Geografia de Mato Grosso',
        descricao: 'Resumos didáticos sobre biomas e economia. Confirme os dados no IBGE.',
        links: [
          {
            rotulo: 'Biomas de MT (Blog do Vestibular)',
            url: 'https://www.blogdovestibular.com/teoria/geografia/resumo-sobre-biomas-de-mato-grosso.html',
            tipo: 'estudo',
          },
          { rotulo: 'IBGE', url: 'https://www.ibge.gov.br', tipo: 'oficial' },
        ],
      },
      {
        titulo: 'Ética e Filosofia / Relações Interpessoais',
        descricao: 'Resumos de ética no serviço público; o Decreto 1.171/1994 é a base clássica.',
        links: [busca('Ética no serviço público', 'ética no serviço público resumo concurso Decreto 1.171/1994')],
      },
      {
        titulo: 'Noções de Administração Pública',
        descricao: 'Apostila de Direito Administrativo para concursos: princípios, poderes e atos.',
        links: [busca('Direito Administrativo para concursos', 'noções de administração pública direito administrativo concurso resumo')],
      },
    ],
  },
];

// ------------------------------------------------------------------ os 14 blocos de TI

export interface BlocoTI {
  n: number;
  bloco: string;
  estudar: string;
  onde: string;
}

export const BLOCOS_TI: BlocoTI[] = [
  { n: 1, bloco: 'Fundamentos e arquitetura', estudar: 'Conceitos de computação; arquitetura de computadores (CPU, memória, barramentos); sistemas de informação (SIG, SAD, ERP).', onde: 'Patterson/Hennessy (noções); apostilas de Fundamentos de Sistemas de Informação.' },
  { n: 2, bloco: 'Programação e estruturas de dados', estudar: 'Lógica de programação; algoritmos; listas, pilhas, filas, árvores, grafos, hash; POO.', onde: 'CS50/CC50; Curso em Vídeo (Gustavo Guanabara); Cormen (noções).' },
  { n: 3, bloco: 'Engenharia de software', estudar: 'Análise e modelagem; requisitos; documentação; testes; manutenção; metodologias ágeis (Scrum, Kanban).', onde: 'Sommerville/Pressman; Scrum Guide oficial.' },
  { n: 4, bloco: 'Web e APIs', estudar: 'HTML, CSS, JavaScript; serviços web; APIs REST (métodos, status codes, JSON).', onde: 'MDN Web Docs; restfulapi.net.' },
  { n: 5, bloco: 'Banco de dados', estudar: 'Modelagem relacional; SQL (DDL, DML, joins); administração; integridade; backup e recuperação.', onde: 'Elmasri/Navathe; W3Schools SQL; docs PostgreSQL.' },
  { n: 6, bloco: 'Redes', estudar: 'OSI e TCP/IP; protocolos; IPv4/IPv6 e sub-redes; equipamentos; cabeamento estruturado; serviços de rede.', onde: 'Tanenbaum/Kurose; canais de concurso de redes.' },
  { n: 7, bloco: 'Sistemas operacionais', estudar: 'Windows e Linux: instalação, configuração, administração; usuários e permissões; serviços; backup.', onde: 'Microsoft Learn; Linux Foundation (noções).' },
  { n: 8, bloco: 'Segurança da informação', estudar: 'Políticas; identidades e acessos; criptografia; certificados; firewall; vulnerabilidades; pentest; incidentes; ISO 27001 e 27002.', onde: 'Cartilha CERT.br; resumos das ISO; canais de segurança para concurso.' },
  { n: 9, bloco: 'Governança e gestão de TI', estudar: 'Planejamento estratégico; PDTI; ITIL; PMBOK; gestão de riscos; indicadores; COBIT.', onde: 'Guias ITIL 4 e COBIT (noções); PMBOK. Sua formação em Gerenciamento de Projetos ajuda aqui.' },
  { n: 10, bloco: 'DevOps', estudar: 'Git; integração contínua (CI); entrega contínua (CD); contêineres (Docker).', onde: 'Docs oficiais de Git e Docker; Pro Git.' },
  { n: 11, bloco: 'Dados e BI', estudar: 'Análise de dados; visualização; Business Intelligence (Power BI, data warehouse, ETL).', onde: 'Microsoft Learn (Power BI); noções de data warehouse.' },
  { n: 12, bloco: 'Contratação de TI na Adm. Pública', estudar: 'Processo de contratação de soluções de TI; Lei 14.133/2021 aplicada a TI.', onde: 'Texto da lei no Planalto; guias de contratação de TI (SGD/Gov.br).' },
  { n: 13, bloco: 'Legislação de dados', estudar: 'LGPD (13.709/2018); LAI (12.527/2011); segurança de dados na Adm. Pública.', onde: 'Textos oficiais no Planalto; guia da ANPD.' },
  { n: 14, bloco: 'Suporte e documentação', estudar: 'Suporte técnico; atendimento a usuários; treinamento; documentação técnica.', onde: 'Noções de service desk (ITIL); boas práticas de documentação.' },
];

// ------------------------------------------------------------------ treinar

export const BANCOS_QUESTOES: { nome: string; texto: string; url: string }[] = [
  {
    nome: 'QConcursos',
    texto: 'O maior banco. Filtre por disciplina e pela banca Selecon. Tem plano grátis limitado.',
    url: 'https://www.qconcursos.com',
  },
  {
    nome: 'TEC Concursos',
    texto: 'Excelente para TI, com estatística de desempenho.',
    url: 'https://www.tecconcursos.com.br',
  },
  {
    nome: 'Prova Selecon (Câmara de São Gonçalo/RJ, 2022)',
    texto:
      'Analista Legislativo de TI, questões por disciplina. Foi a única prova do Selecon em Câmara com TI que achei; não achei o PDF completo nem o gabarito oficial.',
    url: 'https://questoes.grancursosonline.com.br/prova/camara-de-sao-goncalo-rj-2022-selecon-analista-legislativo-area-tecnologia-da-informacao-administracao-de-servidores',
  },
];

export const PASSOS_DISCURSIVA = [
  'Escolha um tema de TI do edital (por exemplo, "explique o modelo OSI" ou "política de segurança da informação conforme a ISO 27001").',
  'Escreva de 20 a 30 linhas, sem consulta, cronometrando o tempo.',
  'Peça uma avaliação (ao NotebookLM ou a uma IA) de clareza, fidelidade ao tema, consistência técnica e correção formal: é o que vale os 100 pontos.',
];

export const ROTINA =
  'Estude o conteúdo, faça 10 a 20 questões do tema, revise os erros e escreva 1 discursiva por semana. Encaixe a revisão em áudio (podcast do NotebookLM) na corrida da noite.';

// ------------------------------------------------------------------ NotebookLM

export interface Prompt {
  titulo: string;
  onde: string;
  texto: string;
}

export const PASSOS_NOTEBOOKLM = [
  'Crie um notebook (por exemplo, "Câmara Cuiabá – Analista TI").',
  'Suba como fontes: o edital, as 4 leis municipais, a Lei 14.133, a LGPD, a LAI e o Scrum Guide.',
  'Use "Descobrir fontes" para ele buscar o conteúdo na web, um bloco por vez (só redes, só segurança) para vir mais aprofundado.',
  'Gere o guia de estudo, o mapa mental e o áudio.',
  'Confira sempre o número do artigo no texto oficial antes de decorar.',
];

export const PROMPTS: Prompt[] = [
  {
    titulo: 'Descobrir fontes (ele busca na web)',
    onde: 'Botão "Descobrir fontes"',
    texto:
      'Reúna materiais de estudo, em português, nível concurso público, sobre os conhecimentos específicos de TI do cargo Analista Legislativo - TI da Câmara Municipal de Cuiabá (2026): fundamentos e arquitetura; programação, estruturas de dados e POO; engenharia de software e métodos ágeis; web e APIs REST; banco de dados e SQL; redes (OSI, TCP/IP); sistemas operacionais Windows e Linux; segurança da informação (ISO 27001/27002); governança e gestão de TI; CI/CD e conteinerização; análise de dados e BI; Lei 14.133/2021; LGPD; LAI. Priorize fontes confiáveis e atualizadas.',
  },
  {
    titulo: 'Guia de estudo organizado',
    onde: 'Chat do notebook',
    texto:
      'Com base somente nas fontes deste notebook, monte um guia de estudo para o cargo Analista Legislativo - TI. Organize por tema, do básico ao avançado. Em cada tema: resumo objetivo, pontos que mais caem em prova e 3 a 5 questões de revisão com gabarito comentado. Cite de qual fonte veio cada parte.',
  },
  {
    titulo: 'Pontos de maior incidência nas leis',
    onde: 'Chat do notebook, depois de subir as leis',
    texto:
      'Resuma os principais pontos da Lei Orgânica e do Regimento Interno que mais caem em concurso, com base nas fontes. Cite o artigo de cada ponto.',
  },
  {
    titulo: 'Podcast de revisão',
    onde: 'Personalizar a Visão geral em áudio',
    texto:
      'Foco em prova de concurso público, nível superior. Priorize segurança da informação, redes e banco de dados. Explique como revisão para quem já estudou, com exemplos práticos.',
  },
];
