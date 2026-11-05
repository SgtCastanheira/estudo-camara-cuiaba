import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { AREAS, DISCIPLINAS, conteudoDe, disciplinasDaArea } from './data/disciplinas';
import { AtualizacaoService } from './services/atualizacao.service';
import { ProgressoService, Tema } from './services/progresso.service';

const CELULAR_E_TABLET_RETRATO = '(max-width: 959.98px)';

const COR_DO_TEMA: Record<Tema, string> = {
  auto: 'light dark',
  claro: 'light',
  escuro: 'dark',
};

const ICONE_DO_TEMA: Record<Tema, string> = {
  auto: 'brightness_auto',
  claro: 'light_mode',
  escuro: 'dark_mode',
};

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly progresso = inject(ProgressoService);
  private readonly breakpoints = inject(BreakpointObserver);

  /** Celular ou tablet em pé: o menu vira uma gaveta sobre o conteúdo. */
  protected readonly compacto = toSignal(
    this.breakpoints.observe(CELULAR_E_TABLET_RETRATO).pipe(map((r) => r.matches)),
    { initialValue: this.breakpoints.isMatched(CELULAR_E_TABLET_RETRATO) },
  );

  protected readonly menuAberto = signal(!this.compacto());

  protected readonly areas = AREAS.map((area) => ({
    ...area,
    disciplinas: disciplinasDaArea(area.id).map((d) => ({
      ...d,
      disponivel: !!conteudoDe(d.id),
    })),
  }));

  protected readonly totalDisciplinas = DISCIPLINAS.length;
  protected readonly temas: { id: Tema; nome: string; icone: string }[] = [
    { id: 'auto', nome: 'Automático (do sistema)', icone: ICONE_DO_TEMA.auto },
    { id: 'claro', nome: 'Claro', icone: ICONE_DO_TEMA.claro },
    { id: 'escuro', nome: 'Escuro', icone: ICONE_DO_TEMA.escuro },
  ];

  constructor() {
    inject(AtualizacaoService).iniciar();

    // Ao girar o aparelho ou redimensionar a janela: gaveta fechada no celular, fixa no desktop.
    effect(() => this.menuAberto.set(!this.compacto()));
    effect(() => {
      document.body.style.colorScheme = COR_DO_TEMA[this.progresso.tema()];
    });
  }

  protected iconeDoTema(): string {
    return ICONE_DO_TEMA[this.progresso.tema()];
  }

  protected alternarMenu(): void {
    this.menuAberto.update((aberto) => !aberto);
  }

  protected aoNavegar(): void {
    if (this.compacto()) this.menuAberto.set(false);
  }
}
