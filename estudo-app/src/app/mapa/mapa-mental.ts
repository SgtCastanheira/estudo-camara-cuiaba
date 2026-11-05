import { Component, ElementRef, OnDestroy, computed, effect, input, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import type { Markmap } from 'markmap-view';
import { TopicoParaMapa, disciplinaParaNo, topicoParaNo } from './arvore';

/** Um tom por ramo principal; legíveis no tema claro e no escuro. */
const PALETA = ['#3b82f6', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444', '#84cc16'];

/**
 * Mapa mental interativo (toque num ramo abre/fecha; arraste e use dois dedos para zoom),
 * gerado do conteúdo da disciplina. A biblioteca só é baixada quando a aba é aberta.
 */
@Component({
  selector: 'app-mapa-mental',
  imports: [MatFormFieldModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './mapa-mental.html',
  styleUrl: './mapa-mental.scss',
})
export class MapaMental implements OnDestroy {
  readonly titulo = input.required<string>();
  readonly topicos = input.required<TopicoParaMapa[]>();

  /** -1 = disciplina inteira; senão, o índice do tópico. */
  protected readonly selecao = signal(-1);

  private readonly svg = viewChild.required<ElementRef<SVGSVGElement>>('svg');
  private mapa?: Markmap;
  private destruido = false;

  private readonly arvore = computed(() => {
    const t = this.topicos();
    const s = this.selecao();
    return s >= 0 && t[s] ? topicoParaNo(t[s]) : disciplinaParaNo(this.titulo(), t);
  });

  constructor() {
    effect(() => {
      // disciplina inteira: abre só até o 2º nível; um tópico: abre tudo
      void this.desenhar(this.arvore(), this.selecao() < 0 ? 2 : -1);
    });
  }

  protected escolher(valor: number): void {
    this.selecao.set(valor);
  }

  protected ajustar(): void {
    void this.mapa?.fit();
  }

  ngOnDestroy(): void {
    this.destruido = true;
    this.mapa?.destroy();
  }

  private async desenhar(dados: ReturnType<typeof disciplinaParaNo>, nivel: number): Promise<void> {
    const { Markmap } = await import('markmap-view');
    if (this.destruido) return;
    // Celular: nós mais estreitos e menos espaço entre níveis, para o ajuste automático
    // dar uma escala maior (texto legível sem precisar aproximar).
    const estreito = this.svg().nativeElement.clientWidth < 480;
    const opcoes = {
      autoFit: true,
      duration: 250,
      fitRatio: 0.98,
      initialExpandLevel: nivel,
      maxWidth: estreito ? 150 : 240,
      paddingX: estreito ? 6 : 10,
      spacingHorizontal: estreito ? 32 : 60,
      spacingVertical: estreito ? 6 : 8,
      color: (no: { state?: { path?: string } }) => {
        const ramo = Number(no.state?.path?.split('.')[1] ?? 0); // 1º nível abaixo da raiz
        return PALETA[ramo % PALETA.length];
      },
    };
    // INode da biblioteca tem campos extras opcionais; nossos nós têm content + children.
    const raiz = dados as never;
    if (!this.mapa) {
      this.mapa = Markmap.create(this.svg().nativeElement, opcoes as never, raiz);
    } else {
      this.mapa.setOptions(opcoes as never);
      await this.mapa.setData(raiz);
    }
    void this.mapa.fit();
  }
}
