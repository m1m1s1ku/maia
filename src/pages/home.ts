import { html, TemplateResult } from 'lit-html';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement } from 'lit/decorators/custom-element.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { query } from 'lit/decorators.js';

import Page from '../core/strategies/Page';
import { renderRepartitionChart } from '../charts';

@customElement('ui-home')
export class HomeController extends Page {
  @query('.repartition-chart-container')
  private chartContainer!: HTMLDivElement;

  public async firstUpdated(): Promise<void> {
    renderRepartitionChart(this.chartContainer);
  }

  public render(): void | TemplateResult {
    return html`
      <div id="page" class="page" role="main">
        <div class="projects-section-header">
            <p>Dashboard</p>
        </div>
        <div class="charts">
            <section class="repartition">
                <h3>Repartition</h3>
                <div class="repartition-chart-container"></div>
            </section>
            <section>
                <h3>Net worth</h3>
            </section>
        </div>
      </div>
    `;
  }
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-home': HomeController;
	}
}