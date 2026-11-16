import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { AudioService } from '../../audio/audio.service';
import { ItemAudio, textoDoTopico } from '../../audio/fala';
import { MarkdownComponent } from '../../components/markdown';
import { Quiz } from '../../components/quiz';
import { conteudoDe, disciplinaPorId, tituloLimpo } from '../../data/disciplinas';
import { ROTULO_PESO } from '../../data/modelos';
import { MapaMental } from '../../mapa/mapa-mental';
import { ProgressoService } from '../../services/progresso.service';

@Component({
  selector: 'app-disciplina',
  imports: [
    RouterLink,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule,
    MarkdownComponent,
    Quiz,
    MapaMental,
  ],
  templateUrl: './disciplina.html',
  styleUrl: './disciplina.scss',
})
export class Disciplina {
  protected readonly progresso = inject(ProgressoService);
  protected readonly audio = inject(AudioService);

  /** Vem do parâmetro :id da rota (withComponentInputBinding). */
  readonly id = input.required<string>();
  /** Aula a abrir, vinda de ?aula=<id do tópico>. */
  readonly aula = input<string>();
  /** Aba aberta, vinda de ?aba=N (0 Aulas, 1 Resumo, 2 Questões, 3 Mapa). */
  readonly aba = input(0, { transform: numberAttribute });

  protected readonly limpo = tituloLimpo;

  protected readonly disciplina = computed(() => disciplinaPorId(this.id()));
  protected readonly conteudo = computed(() => conteudoDe(this.id()));

  protected readonly rotuloPeso = computed(() => {
    const peso = this.conteudo()?.peso;
    return peso ? ROTULO_PESO[peso] : undefined;
  });

  /** Um item de áudio por tópico, já com o texto preparado para a voz. */
  private readonly itensDeAudio = computed<ItemAudio[]>(() => {
    const d = this.disciplina();
    const c = this.conteudo();
    if (!d || !c) return [];
    return c.topicos.map((t) => ({
      chave: this.chaveDeAudio(t.id),
      titulo: t.titulo,
      subtitulo: d.nomeCurto,
      texto: textoDoTopico(t),
    }));
  });

  /** Lê a partir do tópico `inicio` e segue sozinho até o último. */
  protected ouvir(inicio: number): void {
    this.audio.tocar(this.itensDeAudio(), inicio);
  }

  /** Este tópico está sendo lido agora? (mostra o ícone de som no cabeçalho) */
  protected falando(topicoId: string): boolean {
    return this.audio.estado() === 'tocando' && this.audio.item()?.chave === this.chaveDeAudio(topicoId);
  }

  private chaveDeAudio(topicoId: string): string {
    return `${this.id()}:${topicoId}`;
  }

  /** Macetes de todas as aulas reunidos (aba Resumo). */
  protected readonly resumo = computed(() =>
    (this.conteudo()?.topicos ?? [])
      .map((t, i) => ({ numero: i + 1, titulo: tituloLimpo(t.titulo), fixacao: t.fixacao, rotulo: t.fixacaoTitulo }))
      .filter((t) => t.fixacao.length),
  );

  /** Tempo estimado de leitura de todas as aulas (200 palavras por minuto). */
  protected readonly minutos = computed(() => {
    const palavras = (this.conteudo()?.topicos ?? []).reduce(
      (s, t) => s + t.conteudo.split(/\s+/).length + t.fixacao.join(' ').split(/\s+/).length,
      0,
    );
    return Math.max(1, Math.round(palavras / 200));
  });

  protected readonly estudados = computed(() => this.progresso.totalEstudados(this.id()));
  protected readonly percentual = computed(() => {
    const total = this.conteudo()?.topicos.length ?? 0;
    return total ? Math.round((this.estudados() / total) * 100) : 0;
  });
}
