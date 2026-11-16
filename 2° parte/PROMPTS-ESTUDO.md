---
id: "03"
slug: informatica
titulo: "Noções de Informática"
bloco: "Conhecimentos Básicos"
questoes: 10
peso: facil
---

# 03 · Noções de Informática

5 questões nos Básicos. É nível usuário (não é a prova específica de TI). Pra você, dev, o ganho está em atalhos, Office x LibreOffice e segurança — e em **não responder "como técnico"**: a banca cobra o comportamento do programa, não o conceito geral.

## 1. Microinformática
- **Hardware:** CPU, memória RAM (volátil), armazenamento (HD/SSD — não volátil), dispositivos de entrada (teclado, mouse, scanner) e saída (monitor, impressora).
- **Dispositivos mistos (E/S):** monitor touchscreen, impressora multifuncional, pen drive, HD externo, placa de rede.
- **Software:** básico (sistema operacional), aplicativo (programas do usuário) e utilitário (antivírus, compactador).
- **Memórias:** registradores → cache → RAM → armazenamento. **ROM** guarda o firmware (BIOS/UEFI) e não perde o conteúdo.
- **Unidades:** 1 byte = 8 bits; KB, MB, GB, TB (múltiplos de 1024 na computação). **Conexões:** USB, HDMI, VGA, DisplayPort.
- **Armazenamento:** HD (mecânico), SSD (memória flash, mais rápido, sem partes móveis), pen drive, cartão, DVD/Blu-ray.

## 2. Sistemas operacionais
- **Windows 10/11:** Explorador de Arquivos, Painel de Controle/Configurações, Lixeira, Windows Defender (antivírus e firewall), Windows Update, **BitLocker** (criptografia de disco). Sistemas de arquivos: **NTFS** (padrão), FAT32 (limite de 4 GB por arquivo), exFAT.
- **Linux:** raiz é `/`; tudo é arquivo; permissões `rwx`; comandos `ls`, `cd`, `cp`, `mv`, `sudo`. **Kernel** é o núcleo; distribuições: Ubuntu, Debian, Fedora; gerenciador de pacotes: `apt`. Sistema de arquivos comum: ext4.
- **Atalhos do Windows:**
  - `Win+D` mostra a área de trabalho · `Win+E` abre o Explorador · `Win+L` bloqueia a tela · `Win+R` Executar · `Win+I` Configurações.
  - `Alt+Tab` alterna janelas · `Alt+F4` fecha a janela · `Ctrl+Shift+Esc` Gerenciador de Tarefas.
  - `F2` renomeia · `F5` atualiza · `Del` envia à Lixeira · `Shift+Del` exclui **sem** passar pela Lixeira · `Print Screen` captura a tela · `Win+Shift+S` recorte de tela.

## 3. Office x LibreOffice
| Microsoft | LibreOffice | Função |
|---|---|---|
| Word | Writer | textos (.docx/.odt) |
| Excel | Calc | planilhas (.xlsx/.ods) |
| PowerPoint | Impress | apresentações (.pptx/.odp) |

- **Atalhos comuns:** `Ctrl+C` copiar, `Ctrl+V` colar, `Ctrl+X` recortar, `Ctrl+Z` desfazer, `Ctrl+Y` refazer, `Ctrl+P` imprimir, `F7` ortografia.
- ⚠️ **Cuidado com Negrito e Salvar:** no **Word em português** os atalhos são `Ctrl+N` = **N**egrito, `Ctrl+S` = **S**ublinhado, `Ctrl+B` = **S**alvar (de "gravar") e `Ctrl+T` = selecionar **t**udo. No **LibreOffice** e no Word em inglês: `Ctrl+B` = **B**old (negrito), `Ctrl+S` = **S**ave, `Ctrl+A` = selecionar tudo. Leia o enunciado: ele costuma dizer qual programa.
- **Excel/Calc:** `F2` edita a célula, `F4` alterna a referência (absoluta/relativa).
- **Funções:** `=SOMA()`, `=MÉDIA()`, `=MÁXIMO()`, `=MÍNIMO()`, `=SE()`, `=SOMASE()`, `=CONT.SE()`, `=CONT.VALORES()`, `=PROCV()`, `=HOJE()`, `=AGORA()`.
- **Fórmulas** começam com `=`. Intervalo `A1:A5` (de A1 a A5); `A1;A5` (só as duas células). Na ordem de cálculo, a potência vem primeiro, depois a multiplicação e a divisão, e por último a soma e a subtração.
- **Erros comuns** (aparecem com cerquilha na frente): `DIV/0` (divisão por zero), `NOME` (função ou nome inválido), `REF` (referência inválida), `VALOR` (tipo errado), `N/D` (valor não encontrado), uma sequência de cerquilhas (coluna estreita).
- **Writer/Word:** estilos (Título 1, Normal), sumário automático, cabeçalho e rodapé, mala direta, controle de alterações, **Localizar e substituir**.

> **FIXAÇÃO**
> 1. Referência absoluta `$A$1` trava ao arrastar; `A1` muda; mistas `$A1`/`A$1`.
> 2. RAM é volátil (perde ao desligar); SSD/HD não.
> 3. Word=Writer, Excel=Calc, PowerPoint=Impress.
> 4. Word PT-BR: Ctrl+B salva, Ctrl+N negrito, Ctrl+S sublinha. LibreOffice: Ctrl+S salva, Ctrl+B negrito.
> 5. Shift+Del apaga sem Lixeira.

## 4. Redes e internet
- **TCP/IP**, navegadores (Edge, Firefox, Chrome), correio eletrônico, ferramentas de colaboração.
- HTTP 80, HTTPS 443 (seguro, com cadeado). **DNS** traduz nome em IP; **DHCP** entrega o IP. **URL:** protocolo://domínio/caminho.
- **E-mail:** envio por **SMTP**; recebimento por **POP3** (baixa a mensagem) ou **IMAP** (mantém no servidor). **Cc** (cópia visível) x **Cco** (cópia oculta).
- **Atalhos de navegador:** `Ctrl+T` nova aba · `Ctrl+Shift+T` reabre aba fechada · `Ctrl+D` favorito · `Ctrl+H` histórico · `Ctrl+J` downloads · `F5` recarrega · `Ctrl+Shift+Del` limpa dados de navegação · `Ctrl+Shift+N` janela anônima (Chrome e Edge; no Firefox é `Ctrl+Shift+P`).
- **Intranet** (rede interna) x **Internet** x **Extranet** (acesso externo controlado). **Cookies** guardam preferências e sessão; o modo anônimo não os mantém depois de fechar.
- **Wi-Fi:** prefira WPA2/WPA3. **VPN** cria um túnel seguro pela internet.

## 5. Nuvem e serviços online
- **Modelos de serviço:** **SaaS** (software pronto — Gmail, Microsoft 365), **PaaS** (plataforma para desenvolver) e **IaaS** (infraestrutura — servidores virtuais). Implantação: pública, privada, híbrida e comunitária.
- **Características:** autoatendimento, amplo acesso por rede, elasticidade rápida, recursos compartilhados e serviço medido.
- Armazenamento online (Google Drive, OneDrive, Dropbox): sincroniza e permite compartilhar, mas depende de **conexão** e de **boas práticas de segurança**. Nuvem não substitui o **backup**.
- **Colaboração:** edição simultânea, comentários, reuniões por vídeo e armazenamento compartilhado.

## 6. Segurança da informação
- **Vírus** precisa de hospedeiro; **worm** se espalha sozinho; **trojan (cavalo de Troia)** se disfarça; **ransomware** sequestra e cobra resgate; **spyware** espiona; **keylogger** captura teclas; **backdoor** abre acesso oculto; **rootkit** esconde o invasor; **botnet** é uma rede de máquinas controladas.
- **Phishing:** isca por e-mail/link falso. **Engenharia social:** manipula a pessoa. **DoS/DDoS** derruba um serviço por excesso de acessos. **Força bruta** testa senhas.
- **Backup**, **firewall** (filtra tráfego), **antivírus**, **2FA** (segundo fator além da senha).
- **Senha forte:** longa, com letras, números e símbolos, sem dados pessoais, **única por serviço**; use gerenciador de senhas.
- **Backup:** completo, incremental e diferencial; regra 3-2-1. **Criptografia** protege o sigilo; **assinatura digital** garante autoria e integridade.
- **Boas práticas:** atualizar o sistema, desconfiar de anexos e links inesperados, não instalar programas de origem duvidosa e conferir o endereço (cadeado não garante que o site seja confiável).

## 7. LGPD (Lei 13.709/2018) — noções
- Protege **dados pessoais**. Agentes: controlador (decide), operador (trata), encarregado/DPO. Fiscal: **ANPD**.
- **Dado pessoal:** identifica ou pode identificar uma pessoa. **Dado sensível:** origem racial ou étnica, saúde, biometria, religião, opinião política etc. **Tratamento** é qualquer operação com o dado (coletar, armazenar, compartilhar, excluir).
- O titular tem direitos de **acesso, correção, exclusão** e **portabilidade**. O tratamento exige uma **base legal**: consentimento é só uma delas.
- Os **princípios** incluem finalidade, adequação, necessidade, transparência e segurança.

---

## 10 questões no estilo Selecon

**1.** No Excel, a referência que NÃO muda ao arrastar a fórmula é:
a) A1 b) $A$1 c) A$1 apenas na coluna d) nenhuma

**2.** O equivalente do Microsoft Excel no LibreOffice é:
a) Writer b) Impress c) Calc d) Base

**3.** Memória volátil, que perde o conteúdo ao desligar:
a) HD b) SSD c) RAM d) ROM

**4.** Praga que se multiplica e se espalha sozinha pela rede, sem hospedeiro:
a) vírus b) worm c) trojan d) spyware

**5.** Golpe que usa e-mail falso para "pescar" senhas e dados:
a) backup b) firewall c) phishing d) cookie

**6.** No LibreOffice Writer, o atalho para salvar um documento é:
a) Ctrl+P b) Ctrl+S c) Ctrl+B d) Ctrl+Z

**7.** No protocolo da web, HTTPS usa a porta:
a) 21 b) 80 c) 443 d) 25

**8.** A LGPD é fiscalizada por qual órgão?
a) ANATEL b) ANPD c) SERPRO d) ANVISA

**9.** Recurso que exige um segundo fator além da senha:
a) firewall b) antivírus c) autenticação em dois fatores d) backup

**10.** No Linux, o diretório raiz é representado por:
a) C:\ b) / c) ~ d) \root

---

### GABARITO COMENTADO
1. **(b)** `$A$1` trava linha e coluna (referência absoluta).
2. **(c)** Excel ↔ Calc.
3. **(c)** RAM é volátil.
4. **(b)** Worm se propaga sozinho; vírus precisa de hospedeiro.
5. **(c)** Phishing.
6. **(b)** Ctrl+S (Save) no LibreOffice. No Word em português, salvar é Ctrl+B.
7. **(c)** HTTPS = 443.
8. **(b)** ANPD (Autoridade Nacional de Proteção de Dados).
9. **(c)** 2FA.
10. **(b)** Raiz do Linux é `/`.
