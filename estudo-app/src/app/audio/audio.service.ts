import { Injectable, computed, signal } from '@angular/core';
import { ItemAudio, partirEmTrechos } from './fala';

export type EstadoAudio = 'parado' | 'tocando' | 'pausado';

export const VELOCIDADES = [0.75, 1, 1.25, 1.5, 1.75, 2];

const CHAVE_PREFS = 'estudo-cuiaba:audio:v1';

interface Prefs {
  velocidade: number;
  vozUri: string | null;
  manterTela: boolean;
}

function lerPrefs(): Prefs {
  const padrao: Prefs = { velocidade: 1, vozUri: null, manterTela: true };
  try {
    return { ...padrao, ...(JSON.parse(localStorage.getItem(CHAVE_PREFS) ?? '{}') as Partial<Prefs>) };
  } catch {
    return padrao;
  }
}

/** WAV mudo (10 s, 8 kHz, 8 bits) gerado na hora, sem arquivo. */
function urlDeSilencio(segundos = 10, taxa = 8000): string {
  const n = segundos * taxa;
  const buf = new ArrayBuffer(44 + n);
  const v = new DataView(buf);
  const txt = (pos: number, s: string) => [...s].forEach((c, i) => v.setUint8(pos + i, c.charCodeAt(0)));
  txt(0, 'RIFF');
  v.setUint32(4, 36 + n, true);
  txt(8, 'WAVEfmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); // PCM
  v.setUint16(22, 1, true); // mono
  v.setUint32(24, taxa, true);
  v.setUint32(28, taxa, true);
  v.setUint16(32, 1, true);
  v.setUint16(34, 8, true);
  txt(36, 'data');
  v.setUint32(40, n, true);
  new Uint8Array(buf, 44).fill(128); // 8 bits sem sinal: 128 = silêncio
  return URL.createObjectURL(new Blob([buf], { type: 'audio/wav' }));
}

/**
 * Leitura em voz alta com a síntese de voz do aparelho (Web Speech API), em português.
 *
 * Decisões para funcionar em vários navegadores:
 * - A fala é dividida em trechos curtos, tocados um por vez (o Chrome corta falas longas).
 * - "Pausar" cancela e guarda o trecho; "continuar" repete esse trecho. O pause()/resume()
 *   nativo não funciona no Android.
 * - A referência da fala é guardada (senão o Chrome pode perder o evento "onend").
 * - Um "vigia" avança se o "onend" nunca chegar (acontece no Android).
 * - Tela ligada (Wake Lock) + áudio mudo em loop + Media Session: ajudam a manter a leitura
 *   com a tela apagada e a usar os botões do fone. É "melhor esforço": depende do aparelho.
 */
@Injectable({ providedIn: 'root' })
export class AudioService {
  readonly suportado =
    typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';

  private readonly synth = this.suportado ? window.speechSynthesis : null;
  private readonly prefs = lerPrefs();

  readonly estado = signal<EstadoAudio>('parado');
  readonly fila = signal<ItemAudio[]>([]);
  readonly indice = signal(0);
  readonly trecho = signal(0);
  readonly totalTrechos = signal(0);
  readonly erro = signal<string | null>(null);

  readonly velocidade = signal(VELOCIDADES.includes(this.prefs.velocidade) ? this.prefs.velocidade : 1);
  readonly vozUri = signal<string | null>(this.prefs.vozUri);
  readonly manterTela = signal(this.prefs.manterTela);
  /** Vozes em português, as melhores primeiro (pt-BR, depois as que funcionam offline). */
  readonly vozes = signal<SpeechSynthesisVoice[]>([]);

  readonly item = computed<ItemAudio | undefined>(() => this.fila()[this.indice()]);
  readonly ativo = computed(() => this.estado() !== 'parado');
  readonly progresso = computed(() => (this.totalTrechos() ? this.trecho() / this.totalTrechos() : 0));
  readonly vozEmUso = computed<SpeechSynthesisVoice | undefined>(
    () => this.vozes().find((v) => v.voiceURI === this.vozUri()) ?? this.vozes()[0],
  );

  private trechos: string[] = [];
  private geracao = 0; // invalida callbacks de falas antigas
  private utterancia?: SpeechSynthesisUtterance;
  private timer?: ReturnType<typeof setTimeout>;
  private vigia?: ReturnType<typeof setTimeout>;
  private luz: WakeLockSentinel | null = null;
  private silencio?: HTMLAudioElement;

  constructor() {
    if (!this.synth) return;
    this.carregarVozes();
    this.synth.addEventListener('voiceschanged', () => this.carregarVozes());
    // O Chrome continua falando depois de recarregar a página; corta ao sair.
    window.addEventListener('pagehide', () => this.synth?.cancel());
    // O Wake Lock é liberado sozinho quando a aba some; pede de novo ao voltar.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.estado() === 'tocando') void this.pedirLuz();
    });
    this.registrarControlesDeMidia();
  }

  // ---------------------------------------------------------------- controles

  /** Toca a lista a partir do item `inicio`, passando sozinha para o próximo. */
  tocar(itens: ItemAudio[], inicio = 0): void {
    if (!this.synth || !itens.length) return;
    this.erro.set(null);
    this.fila.set(itens);
    this.indice.set(Math.min(Math.max(inicio, 0), itens.length - 1));
    this.iniciarItem('imediato'); // dentro do toque do usuário: o iPhone exige isso
    this.silencioPlay();
    void this.pedirLuz();
  }

  alternar(): void {
    if (this.estado() === 'tocando') this.pausar();
    else if (this.estado() === 'pausado') this.retomar();
  }

  pausar(): void {
    if (this.estado() !== 'tocando') return;
    this.geracao++;
    this.limparTemporizadores();
    this.synth?.cancel();
    this.estado.set('pausado');
    this.silencioPausa();
    void this.soltarLuz();
    this.atualizarMidia();
  }

  retomar(): void {
    if (this.estado() !== 'pausado') return;
    this.estado.set('tocando');
    this.falar('imediato'); // repete o trecho em que parou
    this.silencioPlay();
    void this.pedirLuz();
    this.atualizarMidia();
  }

  proximoItem(): void {
    if (this.indice() + 1 < this.fila().length) {
      this.indice.update((i) => i + 1);
      this.iniciarItem('troca');
    } else {
      this.parar();
    }
  }

  anteriorItem(): void {
    // Se já avançou no tópico, volta ao começo dele; se não, vai ao anterior.
    if (this.trecho() < 2 && this.indice() > 0) this.indice.update((i) => i - 1);
    this.iniciarItem('troca');
  }

  parar(): void {
    this.geracao++;
    this.limparTemporizadores();
    this.synth?.cancel();
    this.estado.set('parado');
    this.fila.set([]);
    this.trechos = [];
    this.trecho.set(0);
    this.totalTrechos.set(0);
    this.silencioPausa();
    void this.soltarLuz();
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = 'none';
    }
  }

  definirVelocidade(v: number): void {
    this.velocidade.set(v);
    this.salvarPrefs();
    if (this.estado() === 'tocando') this.falar('troca'); // vale já, repetindo o trecho atual
  }

  definirVoz(uri: string): void {
    this.vozUri.set(uri);
    this.salvarPrefs();
    if (this.estado() === 'tocando') this.falar('troca');
  }

  definirManterTela(ligado: boolean): void {
    this.manterTela.set(ligado);
    this.salvarPrefs();
    if (!ligado) void this.soltarLuz();
    else if (this.estado() === 'tocando') void this.pedirLuz();
  }

  // ------------------------------------------------------------------ fala

  private iniciarItem(modo: 'imediato' | 'troca'): void {
    const item = this.item();
    if (!item) return;
    this.trechos = partirEmTrechos(item.texto);
    this.totalTrechos.set(this.trechos.length);
    this.trecho.set(0);
    this.estado.set('tocando');
    this.falar(modo);
    this.atualizarMidia();
  }

  /**
   * imediato: veio de um toque (fala já; no iPhone isso precisa ser síncrono).
   * cadeia:   próximo trecho, logo após o fim do anterior.
   * troca:    pulou/mudou algo no meio da fala (cancela e espera um instante).
   */
  private falar(modo: 'imediato' | 'cadeia' | 'troca'): void {
    const synth = this.synth;
    if (!synth) return;
    const g = ++this.geracao;
    this.limparTemporizadores();

    const comecar = () => {
      if (g !== this.geracao || this.estado() !== 'tocando') return;
      const texto = this.trechos[this.trecho()];
      if (!texto) return this.itemConcluido();

      const u = new SpeechSynthesisUtterance(texto);
      u.lang = 'pt-BR';
      u.rate = this.velocidade();
      const voz = this.vozEmUso();
      if (voz) {
        u.voice = voz;
        u.lang = voz.lang;
      }
      u.onend = () => {
        if (g === this.geracao) this.trechoConcluido();
      };
      u.onerror = (e) => {
        if (g !== this.geracao) return;
        if (e.error === 'interrupted' || e.error === 'canceled') return; // fomos nós
        if (e.error === 'not-allowed') {
          this.parar();
          this.erro.set('O navegador bloqueou o áudio. Toque em "Ouvir" de novo.');
          return;
        }
        this.trechoConcluido(); // erro neste trecho: segue para o próximo
      };
      this.utterancia = u;
      // Vigia: se o "onend" nunca vier (Android), avança depois de um tempo folgado.
      const folga = (texto.length / (8 * this.velocidade())) * 1000 + 6000;
      this.vigia = setTimeout(() => {
        if (g === this.geracao) this.trechoConcluido();
      }, folga);
      synth.speak(u);
    };

    if (modo === 'cadeia') comecar();
    else if (modo === 'imediato' && !synth.speaking && !synth.pending) comecar();
    else {
      synth.cancel();
      this.timer = setTimeout(comecar, 60); // o Chrome ignora um speak() colado no cancel()
    }
  }

  private trechoConcluido(): void {
    this.limparTemporizadores();
    if (this.trecho() + 1 < this.trechos.length) {
      this.trecho.update((n) => n + 1);
      this.falar('cadeia');
    } else {
      this.itemConcluido();
    }
  }

  private itemConcluido(): void {
    if (this.indice() + 1 < this.fila().length) {
      this.indice.update((i) => i + 1);
      this.iniciarItem('troca');
    } else {
      this.parar();
    }
  }

  private limparTemporizadores(): void {
    clearTimeout(this.timer);
    clearTimeout(this.vigia);
  }

  // ----------------------------------------------------------------- vozes

  private carregarVozes(): void {
    const lista = (this.synth?.getVoices() ?? []).filter((v) => /^pt/i.test(v.lang));
    const nota = (v: SpeechSynthesisVoice) =>
      (/^pt[-_]br$/i.test(v.lang) ? 0 : 2) + (v.localService ? 0 : 1); // pt-BR e offline primeiro
    lista.sort((a, b) => nota(a) - nota(b) || a.name.localeCompare(b.name));
    this.vozes.set(lista);
  }

  // ------------------------------------------------- tela, fone e bloqueio

  private async pedirLuz(): Promise<void> {
    if (!this.manterTela() || this.luz || !('wakeLock' in navigator)) return;
    try {
      this.luz = await navigator.wakeLock.request('screen');
      this.luz.addEventListener('release', () => (this.luz = null));
    } catch {
      /* sem permissão ou economia de bateria: segue sem manter a tela */
    }
  }

  private async soltarLuz(): Promise<void> {
    const luz = this.luz;
    this.luz = null;
    try {
      await luz?.release();
    } catch {
      /* já liberado */
    }
  }

  private silencioPlay(): void {
    try {
      this.silencio ??= Object.assign(new Audio(urlDeSilencio()), { loop: true });
      void this.silencio.play().catch(() => undefined);
    } catch {
      /* sem suporte: só não aparecem os controles de mídia */
    }
  }

  private silencioPausa(): void {
    this.silencio?.pause();
  }

  private registrarControlesDeMidia(): void {
    if (!('mediaSession' in navigator)) return;
    const acoes: [MediaSessionAction, () => void][] = [
      ['play', () => this.retomar()],
      ['pause', () => this.pausar()],
      ['previoustrack', () => this.anteriorItem()],
      ['nexttrack', () => this.proximoItem()],
      ['stop', () => this.parar()],
    ];
    for (const [nome, fn] of acoes) {
      try {
        navigator.mediaSession.setActionHandler(nome, fn);
      } catch {
        /* ação não suportada neste navegador */
      }
    }
  }

  private atualizarMidia(): void {
    if (!('mediaSession' in navigator)) return;
    const item = this.item();
    if (item && typeof MediaMetadata !== 'undefined') {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: item.titulo,
        artist: item.subtitulo,
        album: 'Estudo · Câmara de Cuiabá',
        artwork: [{ src: new URL('icons/icon-512x512.png', document.baseURI).href, sizes: '512x512', type: 'image/png' }],
      });
    }
    navigator.mediaSession.playbackState = this.estado() === 'tocando' ? 'playing' : 'paused';
  }

  private salvarPrefs(): void {
    try {
      const p: Prefs = { velocidade: this.velocidade(), vozUri: this.vozUri(), manterTela: this.manterTela() };
      localStorage.setItem(CHAVE_PREFS, JSON.stringify(p));
    } catch {
      /* modo privado */
    }
  }
}
