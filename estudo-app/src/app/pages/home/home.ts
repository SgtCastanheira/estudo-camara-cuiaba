import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { AREAS, DATA_PROVA, conteudoDe, disciplinasDaArea } from '../../data/disciplinas';
import { ROTULO_PESO } from '../../data/modelos';
import { ProgressoService } from '../../services/progresso.service';

const DIA_MS = 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-home',
  imports: [
    DatePipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly progresso = inject(ProgressoService);

  protected readonly dataProva = DATA_PROVA;

  protected readonly diasRestantes = (() => {
    const hoje = new Date();
    const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    return Math.round((DATA_PROVA.getTime() - inicioHoje.getTime()) / DIA_MS);
  })();

  protected readonly areas = AREAS.map((area) => ({
    ...area,
    disciplinas: disciplinasDaArea(area.id).map((d) => {
      const conteudo = conteudoDe(d.id);
      return {
        ...d,
        totalTopicos: conteudo?.topicos.length ?? 0,
        disponivel: !!conteudo,
        peso: conteudo?.peso ? ROTULO_PESO[conteudo.peso] : undefined,
      };
    }),
  }));

  private readonly disponiveis = this.areas.flatMap((a) => a.disciplinas).filter((d) => d.disponivel);

  /** Primeira disciplina com tópicos por estudar (ou a primeira, se tudo estiver concluído). */
  protected readonly proxima = computed(
    () =>
      this.disponiveis.find((d) => this.progresso.totalEstudados(d.id) < d.totalTopicos) ??
      this.disponiveis[0],
  );

  protected readonly totalTopicos = this.disponiveis.reduce((s, d) => s + d.totalTopicos, 0);

  protected readonly topicosEstudados = computed(() =>
    this.disponiveis.reduce((s, d) => s + this.progresso.totalEstudados(d.id), 0),
  );

  protected readonly percentualGeral = computed(() =>
    this.totalTopicos ? Math.round((this.topicosEstudados() / this.totalTopicos) * 100) : 0,
  );

  protected estudados(id: string): number {
    return this.progresso.totalEstudados(id);
  }

  protected percentual(id: string, total: number): number {
    return total ? Math.round((this.progresso.totalEstudados(id) / total) * 100) : 0;
  }

  protected resultado(id: string) {
    return this.progresso.resultado(id);
  }
}
