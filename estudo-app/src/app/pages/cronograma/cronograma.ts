import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DATA_PROVA, disciplinaPorId } from '../../data/disciplinas';
import { DiaPlano, ROTULO_DIA, gerarCronograma } from '../../data/plano';
import { ProgressoService, doIso, paraIso } from '../../services/progresso.service';

interface Semana {
  numero: number;
  inicio: Date;
  fim: Date;
  dias: DiaPlano[];
  atual: boolean;
}

@Component({
  selector: 'app-cronograma',
  imports: [DatePipe, RouterLink, MatButtonModule, MatCheckboxModule, MatChipsModule, MatExpansionModule, MatIconModule],
  templateUrl: './cronograma.html',
  styleUrl: './cronograma.scss',
})
export class Cronograma {
  protected readonly progresso = inject(ProgressoService);
  protected readonly rotuloDia = ROTULO_DIA;
  protected readonly dataProva = DATA_PROVA;
  protected readonly hojeIso = paraIso(new Date());

  protected readonly plano = this.progresso.plano;

  protected readonly dias = computed(() => {
    const p = this.plano();
    return gerarCronograma(doIso(p.inicio), p.aulas);
  });

  protected readonly semanas = computed<Semana[]>(() => {
    const dias = this.dias();
    const semanas: Semana[] = [];
    for (let i = 0; i < dias.length; i += 7) {
      const grupo = dias.slice(i, i + 7);
      semanas.push({
        numero: i / 7 + 1,
        inicio: grupo[0].data,
        fim: grupo[grupo.length - 1].data,
        dias: grupo,
        atual: grupo.some((d) => paraIso(d.data) === this.hojeIso),
      });
    }
    return semanas;
  });

  protected readonly aulasPlano = computed(() => this.dias().reduce((s, d) => s + d.aulas.length, 0));

  protected readonly porDia = computed(() => {
    const dias = this.dias().filter((d) => d.tipo === 'estudo' && d.aulas.length);
    return dias.length ? Math.ceil(this.aulasPlano() / dias.length) : 0;
  });

  protected readonly feitas = computed(() =>
    this.dias().reduce((s, d) => s + d.aulas.filter((a) => this.progresso.estudado(a.disciplina, a.topico)).length, 0),
  );

  /** Aulas de dias que já passaram e ainda não foram estudadas. */
  protected readonly atrasadas = computed(() =>
    this.dias()
      .filter((d) => paraIso(d.data) < this.hojeIso)
      .reduce((s, d) => s + d.aulas.filter((a) => !this.progresso.estudado(a.disciplina, a.topico)).length, 0),
  );

  protected eHoje(d: DiaPlano): boolean {
    return paraIso(d.data) === this.hojeIso;
  }

  protected passou(d: DiaPlano): boolean {
    return paraIso(d.data) < this.hojeIso;
  }

  protected nomeDisciplina(id: string): string {
    return disciplinaPorId(id)?.nomeCurto ?? id;
  }

  protected replanejar(): void {
    if (confirm('Refazer o plano a partir de hoje, só com as aulas que você ainda não estudou?')) {
      this.progresso.replanejar();
    }
  }
}
