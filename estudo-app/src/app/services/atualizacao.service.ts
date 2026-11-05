import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

/**
 * Avisa quando há uma versão nova do app/conteúdo. Como o app funciona offline a partir
 * de um cache, sem isto uma correção publicada só apareceria depois de recarregar à mão.
 */
@Injectable({ providedIn: 'root' })
export class AtualizacaoService {
  private readonly sw = inject(SwUpdate);
  private readonly aviso = inject(MatSnackBar);

  iniciar(): void {
    if (!this.sw.isEnabled) return; // desativado em desenvolvimento (ng serve)

    this.sw.versionUpdates
      .pipe(filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY'))
      .subscribe(() => {
        this.aviso
          .open('Nova versão do conteúdo disponível.', 'Atualizar', { duration: 0 })
          .onAction()
          .subscribe(() => document.location.reload());
      });

    // No celular o app costuma ficar dias em segundo plano: ao voltar, procura versão nova.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.sw.checkForUpdate().catch(() => undefined); // sem internet: segue com o cache
      }
    });
  }
}
