import { html, TemplateResult } from 'lit-html';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement } from 'lit/decorators/custom-element.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { query } from 'lit/decorators.js';

import Page from '../core/strategies/Page';
import { renderRepartitionChart } from '../charts';
import { MDCList } from '@material/list';

@customElement('ui-home')
export class HomeController extends Page {
  @query('.repartition-chart-container')
  private chartContainer!: HTMLDivElement;
  @query('.assets-list')
  private assetsList!: HTMLUListElement;  
  @query('.liabilities-list')
  private liabilitiesList!: HTMLUListElement;

  public async firstUpdated(): Promise<void> {
    renderRepartitionChart(this.chartContainer);
    MDCList.attachTo(this.assetsList);
    MDCList.attachTo(this.liabilitiesList);
  }

  public render(): void | TemplateResult {
    return html`
      <div id="page" class="page" role="main">
        <div class="content-section-header">
            <p>Home</p>
        </div>
        <div class="charts">
            <section class="repartition">
                <div class="repartition-chart-container"></div>
            </section>
            <section>
                <h3 class="mdc-typography--subtitle1">Assets</h3>
                <ul class="mdc-list assets-list mdc-list--two-line">
                    <li class="mdc-list-item mdc-ripple-upgraded" tabindex="0">
                        <span class="mdc-list-item__text">
                            <span class="mdc-list-item__primary-text">Savings</span>
                            <span class="mdc-list-item__secondary-text blurry">4439€</span>
                        </span>
                    </li>
                    <li class="mdc-list-item mdc-ripple-upgraded" tabindex="-1">
                        <span class="mdc-list-item__text">
                            <span class="mdc-list-item__primary-text">Shares</span>
                            <span class="mdc-list-item__secondary-text blurry">400€</span>
                        </span>
                    </li>
                    <li class="mdc-list-item mdc-ripple-upgraded" tabindex="-1">
                        <span class="mdc-list-item__text">
                            <span class="mdc-list-item__primary-text">Bricks</span>
                            <span class="mdc-list-item__secondary-text blurry">954,27€</span>
                        </span>
                    </li>
                    <li class="mdc-list-item mdc-ripple-upgraded" tabindex="-1">
                        <span class="mdc-list-item__text">
                            <span class="mdc-list-item__primary-text">Crypto</span>
                            <span class="mdc-list-item__secondary-text blurry">$1,374.87</span>
                        </span>
                    </li>
                </ul>
            </section>
            <section>
                <h3 class="mdc-typography--subtitle1">Liabilities</h3>
                <ul class="mdc-list liabilities-list mdc-list--two-line">
                    <li class="mdc-list-item mdc-ripple-upgraded" tabindex="0">
                        <span class="mdc-list-item__text">
                            <span class="mdc-list-item__primary-text">Visa Premier</span>
                            <span class="mdc-list-item__secondary-text blurry">-244.87€</span>
                        </span>
                    </li>
                    <li class="mdc-list-item mdc-ripple-upgraded" tabindex="-1">
                        <span class="mdc-list-item__text">
                            <span class="mdc-list-item__primary-text">Mortgage</span>
                            <span class="mdc-list-item__secondary-text blurry">-155 772,31</span>
                        </span>
                    </li>
                </ul>
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