import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { MarkdownComponent } from '../../components/markdown';
import { Quiz } from '../../components/quiz';
import { conteudoDe, disciplinaPorId } from '../../data/disciplinas';
import { ROTULO_PESO } from '../../data/modelos';
import { ProgressoService } from '../../services/progresso.service';

@Component({
  selector: 'app-disciplina',
  imports: [
    RouterLink,
    MatTabsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MarkdownComponent,
    Quiz,
  ],
  templateUrl: './disciplina.html',
  styleUrl: './disciplina.scss',
})
export class Disciplina {
  protected readonly progresso = inject(ProgressoService);

  /** Vem do parâmetro :id da rota (withComponentInputBinding). */
  readonly id = input.required<string>();

  protected readonly disciplina = computed(() => disciplinaPorId(this.id()));
  protected readonly conteudo = computed(() => conteudoDe(this.id()));

  protected readonly rotuloPeso = computed(() => {
    const peso = this.conteudo()?.peso;
    return peso ? ROTULO_PESO[peso] : undefined;
  });

  protected readonly estudados = computed(() => this.progresso.totalEstudados(this.id()));
  protected readonly percentual = computed(() => {
    const total = this.conteudo()?.topicos.length ?? 0;
    return total ? Math.round((this.estudados() / total) * 100) : 0;
  });
}
