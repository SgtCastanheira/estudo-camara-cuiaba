import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AudioService, VELOCIDADES } from './audio.service';

/** Gaveta inferior com as opções do áudio (melhor no celular que menus em cascata). */
@Component({
  selector: 'app-opcoes-audio',
  imports: [MatButtonModule, MatRadioModule, MatSlideToggleModule],
  template: `
    <h2 class="titulo">Opções de áudio</h2>

    <h3 class="rotulo" id="rotulo-velocidade">Velocidade da leitura</h3>
    <div class="velocidades" role="group" aria-labelledby="rotulo-velocidade">
      @for (v of velocidades; track v) {
        @if (v === audio.velocidade()) {
          <button mat-flat-button aria-pressed="true">{{ formatar(v) }}×</button>
        } @else {
          <button mat-stroked-button aria-pressed="false" (click)="audio.definirVelocidade(v)">
            {{ formatar(v) }}×
          </button>
        }
      }
    </div>

    @if (audio.vozes().length > 1) {
      <h3 class="rotulo" id="rotulo-voz">Voz</h3>
      <mat-radio-group
        class="vozes"
        aria-labelledby="rotulo-voz"
        [value]="audio.vozEmUso()?.voiceURI"
        (change)="audio.definirVoz($event.value)"
      >
        @for (voz of audio.vozes(); track voz.voiceURI) {
          <mat-radio-button [value]="voz.voiceURI">{{ voz.name }} ({{ voz.lang }})</mat-radio-button>
        }
      </mat-radio-group>
    }

    <mat-slide-toggle class="tela" [checked]="audio.manterTela()" (change)="audio.definirManterTela($event.checked)">
      Manter a tela ligada
    </mat-slide-toggle>
    <p class="nota">
      Com a tela ligada, a leitura não é interrompida pelo bloqueio automático do aparelho.
    </p>

    <button mat-flat-button class="concluir" (click)="ref.dismiss()">Concluir</button>
  `,
  styles: `
    :host { display: block; }
    .titulo { font: var(--mat-sys-title-large); margin: 0 0 8px; }
    .rotulo { font: var(--mat-sys-title-small); color: var(--mat-sys-on-surface-variant); margin: 16px 0 8px; }
    .velocidades { display: flex; flex-wrap: wrap; gap: 8px; }
    .vozes { display: flex; flex-direction: column; }
    .tela { margin-top: 16px; }
    .nota { font: var(--mat-sys-body-small); color: var(--mat-sys-on-surface-variant); margin: 4px 0 16px; }
    .concluir { width: 100%; }
  `,
})
export class OpcoesAudio {
  protected readonly audio = inject(AudioService);
  protected readonly ref = inject<MatBottomSheetRef<OpcoesAudio>>(MatBottomSheetRef);
  protected readonly velocidades = VELOCIDADES;

  /** 1.25 -> "1,25" */
  protected formatar(v: number): string {
    return String(v).replace('.', ',');
  }
}
