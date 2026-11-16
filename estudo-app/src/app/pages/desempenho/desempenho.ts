import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { DISCIPLINAS, conteudoDe } from '../../data/disciplinas';
import { ProgressoService } from '../../services/progresso.service';

@Component({
  selector: 'app-desempenho',
  imports: [DatePipe, RouterLink, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './desempenho.html',
  styleUrl: './desempenho.scss',
})
export class Desempenho {
  protected readonly progresso = inject(ProgressoService);

  protected readonly linhas = computed(() =>
    DISCIPLINAS.flatMap((d) => {
      const c = conteudoDe(d.id);
      if (!c) return [];
      const aulas = c.topicos.length;
      const pct = (n: number) => (aulas ? Math.round((n / aulas) * 100) : 0);
      // Acertos acumulados nos simulados desta disciplina.
      let acertos = 0;
      let total = 0;
      for (const s of this.progresso.simulados()) {
        const x = s.porDisciplina[d.id];
        if (x) {
          acertos += x.acertos;
          total += x.total;
        }
      }
      const quiz = this.progresso.resultado(d.id);
      return [
        {
          ...d,
          aulas,
          teoria: pct(this.progresso.total('teoria', d.id)),
          revisao: pct(this.progresso.total('revisao', d.id)),
          questoes: pct(this.progresso.total('questoes', d.id)),
          acertos,
          total,
          taxa: total ? Math.round((acertos / total) * 100) : null,
          quiz: quiz ? `${quiz.melhor}/${quiz.total}` : null,
        },
      ];
    }),
  );

  /** Disciplinas com pelo menos 3 questões em simulados, da pior taxa de acerto para a melhor. */
  protected readonly fracas = computed(() =>
    this.linhas()
      .filter((l) => l.taxa !== null && l.total >= 3)
      .sort((a, b) => (a.taxa as number) - (b.taxa as number))
      .slice(0, 3),
  );

  protected readonly feitos = computed(() => this.progresso.simulados());

  protected readonly mediaNota = computed(() => {
    const notas = this.feitos().flatMap((s) => (s.nota === null ? [] : [s.nota]));
    return notas.length ? Math.round(notas.reduce((a, b) => a + b, 0) / notas.length) : null;
  });

  protected readonly melhorNota = computed(() => {
    const notas = this.feitos().flatMap((s) => (s.nota === null ? [] : [s.nota]));
    return notas.length ? Math.max(...notas) : null;
  });

  protected minutos(segundos: number): string {
    const m = Math.floor(segundos / 60);
    const s = segundos % 60;
    return `${m}min ${String(s).padStart(2, '0')}s`;
  }
}
