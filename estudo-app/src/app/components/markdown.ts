import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { Marked } from 'marked';

/**
 * No Markdown do GFM, "~texto~" vira texto riscado. Aqui "~" é o símbolo de negação
 * lógica ("~q → ~p"), então o riscado é desligado.
 */
const marked = new Marked({ tokenizer: { del: () => undefined } });

/** Envolve as tabelas num contêiner que rola na horizontal em telas estreitas. */
const comTabelaRolavel = (html: string): string =>
  html.replaceAll('<table>', '<div class="tabela"><table>').replaceAll('</table>', '</table></div>');

/**
 * Renderiza texto Markdown. O Angular sanitiza o HTML resultante em [innerHTML].
 * Sem encapsulamento de estilo, para que o CSS atinja o HTML gerado.
 */
@Component({
  selector: 'app-markdown',
  encapsulation: ViewEncapsulation.None,
  template: `<div class="md" [class.md-inline]="inline()" [innerHTML]="html()"></div>`,
  styles: `
    .md { line-height: 1.65; overflow-wrap: anywhere; }
    .md > :first-child { margin-top: 0; }
    .md > :last-child { margin-bottom: 0; }
    .md h3 {
      font: var(--mat-sys-title-medium);
      color: var(--mat-sys-primary);
      margin: 20px 0 6px;
    }
    .md ul { padding-left: 22px; margin: 8px 0; }
    .md li { margin: 6px 0; }
    .md li > ul { margin: 4px 0; }
    .md code {
      font-family: ui-monospace, 'Roboto Mono', monospace;
      font-size: 0.92em;
      background: var(--mat-sys-surface-container-highest);
      padding: 1px 6px;
      border-radius: 6px;
    }
    .md p { margin: 8px 0; }
    .md-inline { display: inline; }
    .md .tabela { overflow-x: auto; margin: 12px 0; }
    .md table { border-collapse: collapse; min-width: 100%; }
    .md th, .md td {
      border: 1px solid var(--mat-sys-outline-variant);
      padding: 8px 12px;
      text-align: left;
      overflow-wrap: break-word; /* não parte palavras no meio (o .md usa "anywhere") */
    }
    .md th { background: var(--mat-sys-surface-container-high); font-weight: 500; }
    @media (max-width: 599.98px) {
      .md th, .md td { padding: 6px 8px; font-size: 0.9em; }
    }
    @media (max-width: 399.98px) {
      .md th, .md td { padding: 5px 5px; font-size: 0.82em; }
    }
    .md hr { border: 0; border-top: 1px solid var(--mat-sys-outline-variant); margin: 16px 0; }
  `,
})
export class MarkdownComponent {
  readonly texto = input.required<string>();
  /** Sem parágrafo ao redor (para enunciados e alternativas curtas). */
  readonly inline = input(false);

  protected readonly html = computed(() => {
    const texto = this.texto().trim();
    return this.inline()
      ? (marked.parseInline(texto, { async: false }) as string)
      : comTabelaRolavel(marked.parse(texto, { async: false }) as string);
  });
}
