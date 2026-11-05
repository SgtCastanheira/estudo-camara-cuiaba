import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AudioService } from './audio.service';

/** Barra de áudio fixa no rodapé: continua tocando enquanto você navega pelo app. */
@Component({
  selector: 'app-player',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './player.html',
  styleUrl: './player.scss',
})
export class Player {
  protected readonly audio = inject(AudioService);
  private readonly gaveta = inject(MatBottomSheet);

  /** A gaveta é carregada só quando se abre (mantém o carregamento inicial do app leve). */
  protected async abrirOpcoes(): Promise<void> {
    const { OpcoesAudio } = await import('./opcoes-audio');
    this.gaveta.open(OpcoesAudio, { panelClass: 'gaveta-audio' });
  }
}
