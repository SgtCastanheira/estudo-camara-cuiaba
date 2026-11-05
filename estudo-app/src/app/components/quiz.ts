import { Component, ElementRef, computed, inject, input, linkedSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Questao } from '../data/modelos';
import { ProgressoService } from '../services/progresso.service';
import { MarkdownComponent } from './markdown';

interface Rodada {
  fila: Questao[];
  indice: number;
  escolha: number | null;
  respondida: boolean;
  acertos: number;
  erradas: Questao[];
  terminou: boolean;
  /** Rodada com todas as questões (só ela conta para a "melhor nota"). */
  completa: boolean;
}

const novaRodada = (fila: Questao[], completa: boolean): Rodada => ({
  fila,
  indice: 0,
  escolha: null,
  respondida: false,
  acertos: 0,
  erradas: [],
  terminou: false,
  completa,
});

@Component({
  selector: 'app-quiz',
  imports: [
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatExpansionModule,
    MarkdownComponent,
  ],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  private readonly progresso = inject(ProgressoService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly disciplinaId = input.required<string>();
  readonly questoes = input.required<Questao[]>();

  protected readonly letras = 'ABCDEFGH';

  /** Reinicia sozinho se a disciplina (e suas questões) mudar. */
  protected readonly r = linkedSignal<Questao[], Rodada>({
    source: this.questoes,
    computation: (qs) => novaRodada(qs, true),
  });

  protected readonly atual = computed(() => this.r().fila[this.r().indice]);
  protected readonly total = computed(() => this.r().fila.length);
  protected readonly acertou = computed(() => this.r().escolha === this.atual()?.correta);
  protected readonly percentual = computed(() => {
    const r = this.r();
    return r.fila.length ? ((r.indice + (r.respondida ? 1 : 0)) / r.fila.length) * 100 : 0;
  });
  protected readonly melhor = computed(() => this.progresso.resultado(this.disciplinaId()));

  protected escolher(evento: MatRadioChange): void {
    if (this.r().respondida) return;
    this.r.update((r) => ({ ...r, escolha: evento.value as number }));
  }

  protected responder(): void {
    const { escolha } = this.r();
    const questao = this.atual();
    if (escolha === null || !questao) return;
    const certa = escolha === questao.correta;
    this.r.update((r) => ({
      ...r,
      respondida: true,
      acertos: r.acertos + (certa ? 1 : 0),
      erradas: certa ? r.erradas : [...r.erradas, questao],
    }));
  }

  protected proxima(): void {
    const r = this.r();
    if (r.indice + 1 >= r.fila.length) {
      this.r.update((x) => ({ ...x, terminou: true }));
      if (r.completa) {
        this.progresso.registrarResultado(this.disciplinaId(), r.acertos, r.fila.length);
      }
    } else {
      this.r.update((x) => ({ ...x, indice: x.indice + 1, escolha: null, respondida: false }));
    }
    this.voltarAoTopo();
  }

  protected refazerTudo(): void {
    this.r.set(novaRodada(this.questoes(), true));
    this.voltarAoTopo();
  }

  protected refazerErradas(): void {
    this.r.set(novaRodada(this.r().erradas, false));
    this.voltarAoTopo();
  }

  protected mensagem(acertos: number, total: number): string {
    const taxa = total ? acertos / total : 0;
    if (taxa === 1) return 'Perfeito! Gabaritou.';
    if (taxa >= 0.8) return 'Muito bom! Falta pouco para dominar.';
    if (taxa >= 0.6) return 'Bom caminho. Revise os pontos que errou.';
    return 'Vale reler os tópicos e tentar de novo.';
  }

  private voltarAoTopo(): void {
    // O rolamento acontece no mat-sidenav-content, não na janela.
    this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
