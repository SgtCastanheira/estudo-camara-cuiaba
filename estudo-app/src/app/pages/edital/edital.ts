import { Component, computed, inject, signal } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink } from '@angular/router';
import { AREAS, conteudoDe, disciplinasDaArea, tituloLimpo } from '../../data/disciplinas';
import { Etapa, ProgressoService } from '../../services/progresso.service';

@Component({
  selector: 'app-edital',
  imports: [
    RouterLink,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule,
    MatSlideToggleModule,
  ],
  templateUrl: './edital.html',
  styleUrl: './edital.scss',
})
export class Edital {
  protected readonly progresso = inject(ProgressoService);
  protected readonly soPendentes = signal(false);

  protected readonly etapas: { id: Etapa; nome: string; curto: string }[] = [
    { id: 'teoria', nome: 'Teoria', curto: 'T' },
    { id: 'revisao', nome: 'Revisão', curto: 'R' },
    { id: 'questoes', nome: 'Questões', curto: 'Q' },
  ];

  protected readonly areas = AREAS.map((a) => ({
    ...a,
    disciplinas: disciplinasDaArea(a.id).flatMap((d) => {
      const c = conteudoDe(d.id);
      return c ? [{ ...d, topicos: c.topicos.map((t) => ({ ...t, titulo: tituloLimpo(t.titulo) })) }] : [];
    }),
  }));

  private readonly todas = this.areas.flatMap((a) => a.disciplinas);
  private readonly totalTopicos = this.todas.reduce((s, d) => s + d.topicos.length, 0);

  protected readonly resumo = computed(() =>
    this.etapas.map((e) => {
      const feitos = this.todas.reduce((s, d) => s + this.progresso.total(e.id, d.id), 0);
      return { ...e, feitos, percentual: this.totalTopicos ? Math.round((feitos / this.totalTopicos) * 100) : 0 };
    }),
  );

  protected readonly total = this.totalTopicos;

  protected topicosVisiveis(d: { id: string; topicos: { id: string; titulo: string }[] }) {
    return this.soPendentes()
      ? d.topicos.filter((t) => !this.progresso.estudado(d.id, t.id) || !this.progresso.marcado('revisao', d.id, t.id) || !this.progresso.marcado('questoes', d.id, t.id))
      : d.topicos;
  }

  protected completos(d: { id: string; topicos: { id: string }[] }): number {
    return d.topicos.filter(
      (t) =>
        this.progresso.estudado(d.id, t.id) &&
        this.progresso.marcado('revisao', d.id, t.id) &&
        this.progresso.marcado('questoes', d.id, t.id),
    ).length;
  }
}
