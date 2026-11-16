import { Clipboard } from '@angular/cdk/clipboard';
import { Component, inject, input, numberAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { DATA_PROVA, disciplinaPorId } from '../../data/disciplinas';
import {
  BANCOS_QUESTOES,
  BLOCOS_TI,
  ESTRATEGIA,
  LINHAS_PROVA,
  MATERIAIS,
  PASSOS_DISCURSIVA,
  PASSOS_NOTEBOOKLM,
  PROMPTS,
  REGRAS_PROVA,
  REGRA_DE_OURO,
  ROTINA,
  ROTULO_LINK,
  TipoLink,
} from '../../data/guia';

@Component({
  selector: 'app-guia',
  imports: [
    RouterLink,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatSnackBarModule,
  ],
  templateUrl: './guia.html',
  styleUrl: './guia.scss',
})
export class Guia {
  /** Aba aberta, vinda de /guia?aba=N (0 = Prova … 4 = NotebookLM). */
  readonly aba = input(0, { transform: numberAttribute });

  private readonly area = inject(Clipboard);
  private readonly aviso = inject(MatSnackBar);

  protected readonly dataProva = DATA_PROVA;
  protected readonly linhasProva = LINHAS_PROVA;
  protected readonly regras = REGRAS_PROVA;
  protected readonly regraDeOuro = REGRA_DE_OURO;
  protected readonly materiais = MATERIAIS;
  protected readonly blocosTI = BLOCOS_TI;
  protected readonly bancos = BANCOS_QUESTOES;
  protected readonly passosDiscursiva = PASSOS_DISCURSIVA;
  protected readonly rotina = ROTINA;
  protected readonly passosNotebook = PASSOS_NOTEBOOKLM;
  protected readonly prompts = PROMPTS;
  protected readonly rotuloLink = ROTULO_LINK;

  protected readonly estrategia = ESTRATEGIA.map((p) => ({
    ...p,
    disciplinas: p.disciplinas.flatMap((id) => {
      const d = disciplinaPorId(id);
      return d ? [{ id: d.id, nome: d.nomeCurto, icone: d.icone }] : [];
    }),
  }));

  protected readonly totalQuestoes = LINHAS_PROVA.reduce((s, l) => s + l.questoes, 0);

  protected iconeDoLink(tipo: TipoLink): string {
    return tipo === 'busca' ? 'search' : tipo === 'oficial' ? 'verified' : 'open_in_new';
  }

  protected copiar(texto: string): void {
    const ok = this.area.copy(texto);
    this.aviso.open(ok ? 'Prompt copiado' : 'Não consegui copiar; selecione o texto', 'OK', {
      duration: 2500,
    });
  }
}
