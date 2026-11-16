import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import {
  AREAS,
  DATA_PROVA,
  DISCIPLINAS,
  conteudoDe,
  disciplinaPorId,
  disciplinasDaArea,
  tituloLimpo,
} from '../../data/disciplinas';
import { Area, ROTULO_PESO } from '../../data/modelos';
import { PRIORIDADE, gerarCronograma } from '../../data/plano';
import { ProgressoService, doIso, paraIso } from '../../services/progresso.service';

const DIA_MS = 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-home',
  imports: [
    DatePipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly progresso = inject(ProgressoService);

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
        totalQuestoes: conteudo?.questoes.length ?? 0,
        disponivel: !!conteudo,
        peso: conteudo?.peso ? ROTULO_PESO[conteudo.peso] : undefined,
      };
    }),
  }));

  protected readonly cursos = this.areas.flatMap((a) => a.disciplinas.map((d) => ({ ...d, areaId: a.id })));
  private readonly disponiveis = this.cursos.filter((d) => d.disponivel);

  protected readonly filtro = signal<Area | 'todas'>('todas');
  protected readonly cursosFiltrados = computed(() =>
    this.cursos.filter((c) => this.filtro() === 'todas' || c.areaId === this.filtro()),
  );

  protected readonly totalAulas = this.disponiveis.reduce((s, d) => s + d.totalTopicos, 0);
  protected readonly aulasConcluidas = computed(() =>
    this.disponiveis.reduce((s, d) => s + this.progresso.total('teoria', d.id), 0),
  );
  protected readonly revisoes = computed(() =>
    this.disponiveis.reduce((s, d) => s + this.progresso.total('revisao', d.id), 0),
  );
  protected readonly percentualGeral = computed(() =>
    this.totalAulas ? Math.round((this.aulasConcluidas() / this.totalAulas) * 100) : 0,
  );

  /** Próxima aula pendente, seguindo a ordem de prioridade (TI e Legislação primeiro). */
  protected readonly proximaAula = computed(() => {
    for (const id of PRIORIDADE) {
      const t = conteudoDe(id)?.topicos.find((x) => !this.progresso.estudado(id, x.id));
      if (t) {
        return { disciplina: disciplinaPorId(id)!, topico: { ...t, titulo: tituloLimpo(t.titulo) } };
      }
    }
    return null;
  });

  /** Aulas planejadas para hoje no cronograma. */
  protected readonly hoje = computed(() => {
    const p = this.progresso.plano();
    const dias = gerarCronograma(doIso(p.inicio), p.aulas);
    const iso = paraIso(new Date());
    return dias.find((d) => paraIso(d.data) === iso) ?? dias[0];
  });

  protected readonly atalhos = [
    { rota: '/edital', icone: 'checklist', nome: 'Edital verticalizado', texto: 'Teoria, revisão e questões de cada tópico' },
    { rota: '/cronograma', icone: 'event', nome: 'Cronograma', texto: 'Plano diário até a prova' },
    { rota: '/simulado', icone: 'timer', nome: 'Simulados', texto: 'Treine no estilo da prova' },
    { rota: '/desempenho', icone: 'insights', nome: 'Desempenho', texto: 'Veja seus pontos fracos' },
  ];

  protected percentual(id: string, total: number): number {
    return total ? Math.round((this.progresso.total('teoria', id) / total) * 100) : 0;
  }

  protected resultado(id: string) {
    return this.progresso.resultado(id);
  }

  protected readonly todasDisciplinas = DISCIPLINAS.length;
}
