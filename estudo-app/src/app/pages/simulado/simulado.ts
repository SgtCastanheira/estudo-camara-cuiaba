import { Component, ElementRef, OnDestroy, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from '../../components/markdown';
import { DISCIPLINAS, conteudoDe, disciplinaPorId } from '../../data/disciplinas';
import { NOME_AREA } from '../../data/modelos';
import { QuestaoSim, ResultadoSim, corrigir, sortear } from '../../data/simulado';
import { ProgressoService } from '../../services/progresso.service';

type Fase = 'config' | 'prova' | 'resultado';

@Component({
  selector: 'app-simulado',
  imports: [
    RouterLink,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    MarkdownComponent,
  ],
  templateUrl: './simulado.html',
  styleUrl: './simulado.scss',
})
export class Simulado implements OnDestroy {
  private readonly progresso = inject(ProgressoService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly letras = 'ABCDEFGH';
  protected readonly nomeArea = NOME_AREA;
  protected readonly opcoesQuantidade = [10, 20, 30, 40];

  /** Disciplinas com questões, na ordem da prova. */
  protected readonly disciplinas = DISCIPLINAS.flatMap((d) => {
    const c = conteudoDe(d.id);
    return c ? [{ ...d, questoes: c.questoes.length }] : [];
  });

  private readonly pool: QuestaoSim[] = DISCIPLINAS.flatMap((d) =>
    (conteudoDe(d.id)?.questoes ?? []).map((q) => ({ ...q, disc: d.id, area: d.area })),
  );
  private readonly peso = Object.fromEntries(DISCIPLINAS.map((d) => [d.id, d.questoesProva]));

  protected readonly fase = signal<Fase>('config');
  protected readonly selecionadas = signal<string[]>(this.disciplinas.map((d) => d.id));
  protected readonly quantidade = signal(20);

  protected readonly questoes = signal<QuestaoSim[]>([]);
  protected readonly respostas = signal<(number | null)[]>([]);
  protected readonly indice = signal(0);
  protected readonly segundos = signal(0);
  protected readonly resultado = signal<ResultadoSim | null>(null);

  private relogio?: ReturnType<typeof setInterval>;

  protected readonly disponiveis = computed(
    () => this.pool.filter((q) => this.selecionadas().includes(q.disc)).length,
  );
  protected readonly atual = computed(() => this.questoes()[this.indice()]);
  protected readonly respondidas = computed(() => this.respostas().filter((r) => r !== null).length);
  protected readonly tempo = computed(() => this.formatar(this.segundos()));

  protected readonly erradas = computed(() =>
    this.questoes().flatMap((q, i) => (this.respostas()[i] === q.correta ? [] : [{ q, i, resposta: this.respostas()[i] }])),
  );

  protected readonly linhas = computed(() => {
    const r = this.resultado();
    if (!r) return [];
    return Object.entries(r.porDisciplina).map(([id, v]) => ({
      id,
      nome: disciplinaPorId(id)?.nomeCurto ?? id,
      ...v,
      taxa: Math.round((v.acertos / v.total) * 100),
    }));
  });

  protected readonly areasResultado = computed(() => {
    const r = this.resultado();
    if (!r) return [];
    return (['basicos', 'gerais', 'especificos'] as const).map((a) => ({ id: a, nome: NOME_AREA[a], ...r.porArea[a] }));
  });

  ngOnDestroy(): void {
    this.parar();
  }

  protected nomeDisciplina(id: string): string {
    return disciplinaPorId(id)?.nomeCurto ?? id;
  }

  protected alternarDisciplina(id: string): void {
    this.selecionadas.update((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  protected selecionarArea(area: string): void {
    const ids = this.disciplinas.filter((d) => d.area === area).map((d) => d.id);
    this.selecionadas.set(ids);
  }

  protected selecionarTodas(): void {
    this.selecionadas.set(this.disciplinas.map((d) => d.id));
  }

  protected iniciar(): void {
    const pool = this.pool.filter((q) => this.selecionadas().includes(q.disc));
    const sorteadas = sortear(pool, this.quantidade(), this.peso);
    if (!sorteadas.length) return;
    this.questoes.set(sorteadas);
    this.respostas.set(sorteadas.map(() => null));
    this.indice.set(0);
    this.segundos.set(0);
    this.resultado.set(null);
    this.fase.set('prova');
    this.parar();
    this.relogio = setInterval(() => this.segundos.update((s) => s + 1), 1000);
    this.topo();
  }

  protected escolher(e: MatRadioChange): void {
    this.respostas.update((r) => r.map((x, i) => (i === this.indice() ? (e.value as number) : x)));
  }

  protected ir(i: number): void {
    if (i >= 0 && i < this.questoes().length) {
      this.indice.set(i);
      this.topo();
    }
  }

  protected finalizar(): void {
    const brancas = this.questoes().length - this.respondidas();
    if (brancas > 0 && !confirm(`Há ${brancas} questão(ões) em branco, que contam como erro. Finalizar mesmo assim?`)) return;
    this.parar();
    const r = corrigir(this.questoes(), this.respostas());
    this.resultado.set(r);
    this.progresso.registrarSimulado({
      data: new Date().toISOString(),
      segundos: this.segundos(),
      total: r.total,
      acertos: r.acertos,
      nota: r.nota,
      porDisciplina: r.porDisciplina,
    });
    this.fase.set('resultado');
    this.topo();
  }

  protected novo(): void {
    this.parar();
    this.fase.set('config');
    this.topo();
  }

  protected formatar(total: number): string {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  private parar(): void {
    if (this.relogio) clearInterval(this.relogio);
    this.relogio = undefined;
  }

  private topo(): void {
    this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
