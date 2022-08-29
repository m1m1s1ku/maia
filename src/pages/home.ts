import { html, TemplateResult } from 'lit-html';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement } from 'lit/decorators/custom-element.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { query, state } from 'lit/decorators.js';

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

  @state()
  public data: { totalValueOfMyBricks: number; totalValueOfMyBricksPercent: number; totalDividendsReceived: number; totalDividendsReceivedPercent: number; totalEarnedAmount: number; totalEarnedAmountPercent: number; numberOfPropertiesInvestedIn: number; chart: { name: { en: string; fr: string; }; percent: number; price: number; id: string; }[]; };

  constructor() {
    super();
    const stub = {'totalValueOfMyBricks':95427,'totalValueOfMyBricksPercent':-4.910567485426736,'totalDividendsReceived':0,'totalDividendsReceivedPercent':0,'totalEarnedAmount':100355,'totalEarnedAmountPercent':-4.910567485426736,'numberOfPropertiesInvestedIn':14,'chart':[{'name':{'en':'Immeuble Basse Rue','fr':'Immeuble Basse Rue'},'percent':11.56,'price':11033,'id':'1c70f109-31c1-4a5c-8aa7-dcde41124652'},{'name':{'en':'Immeuble Palavas','fr':'Immeuble Palavas'},'percent':10.48,'price':10000,'id':'4455e754-c9a3-4152-8c91-9194d5cab929'},{'name':{'en':'Immeuble Pépinières','fr':'Immeuble Pépinières'},'percent':2.1,'price':2000,'id':'4da57f51-7645-49eb-8e2e-791278b41e54'},{'name':{'en':'Immeuble Lodève','fr':'Immeuble Lodève'},'percent':1.05,'price':1000,'id':'52847e3a-80c6-4621-9fed-582030ecb082'},{'name':{'en':'Immeuble Capitaine Ferrand','fr':'Immeuble Capitaine Ferrand'},'percent':6.29,'price':6000,'id':'801a4423-aa05-4048-a56e-af1dddd28257'},{'name':{'en':'Immeuble Charles Thomas I','fr':'Immeuble Charles Thomas I'},'percent':1.05,'price':1000,'id':'8051226f-0ca5-407a-a27d-980a312c4fb9'},{'name':{'en':'Immeuble Dom Manuel II','fr':'Immeuble Dom Manuel II'},'percent':28.29,'price':27000,'id':'80b2efc8-37ef-4c7a-8a6f-937ea9b3e766'},{'name':{'en':'Immeuble Belfort','fr':'Immeuble Belfort'},'percent':1.05,'price':1000,'id':'81a8ac7d-4887-4a0f-b6e1-5991fe872ec2'},{'name':{'en':'Commerce Niemen','fr':'Commerce Niemen'},'percent':2.1,'price':2000,'id':'a3fc579e-07e7-48f6-9a03-54976fdffd8b'},{'name':{'en':'Immeuble Bas Verson','fr':'Immeuble Bas Verson'},'percent':6.34,'price':6054,'id':'a5f295f8-e34a-4c27-9715-275247fd59f6'},{'name':{'en':'Immeuble Long Pot','fr':'Immeuble Long Pot'},'percent':21.31,'price':20340,'id':'bdbd1c0b-9f81-4357-af9b-59b2d41a5cf9'},{'name':{'en':'Immeuble Baraban','fr':'Immeuble Baraban'},'percent':2.1,'price':2000,'id':'c03335c6-1145-4da1-bd14-8275309a2817'},{'name':{'en':'Immeuble Sainte-Foye','fr':'Immeuble Sainte-Foye'},'percent':3.14,'price':3000,'id':'c07ce93a-a7ae-4fbe-88ad-6d4610afbbb3'},{'name':{'en':'Immeuble Bienfaisance','fr':'Immeuble Bienfaisance'},'percent':3.14,'price':3000,'id':'f6a34700-69a8-4b02-b9ca-3964085c49d2'}]};
    this.data = stub;
  }

  public async firstUpdated(): Promise<void> {
    renderRepartitionChart(this.chartContainer, this.data);
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
                <h4>Immo</h4>
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