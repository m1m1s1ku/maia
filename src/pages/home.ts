import { html, TemplateResult } from 'lit-html';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement } from 'lit/decorators/custom-element.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { query, state } from 'lit/decorators.js';

import Page from '../core/strategies/Page';
import { renderBreakdown, renderRepartitionChart } from '../charts';
import { MDCList } from '@material/list';
import { MDCMenu } from '@material/menu';

enum ChartTypes {
    repartition = 'repartition',
    breakdown = 'breakdown'
}

@customElement('ui-home')
export class HomeController extends Page {
  @query('.chart-container')
  private chartContainer!: HTMLDivElement;
  @query('.assets-list')
  private assetsList!: HTMLUListElement;
  @query('.liabilities-list')
  private liabilitiesList!: HTMLUListElement;
  @query('.class-switch')
  private classSwitch!: HTMLHeadingElement;
  private menu!: MDCMenu;

  @state()
  private isBlurred = true;

  @state()
  public data: { totalValueOfMyBricks: number; totalValueOfMyBricksPercent: number; totalDividendsReceived: number; totalDividendsReceivedPercent: number; totalEarnedAmount: number; totalEarnedAmountPercent: number; numberOfPropertiesInvestedIn: number; chart: { name: { en: string; fr: string; }; percent: number; price: number; id: string; }[]; };

  @state()
  private chart: string = ChartTypes.repartition;
  @state()
  private selectedClass = 'Real estate';

  constructor() {
    super();
    const stub = {
        totalValueOfMyBricks:95427*0.01,
        totalValueOfMyBricksPercent:-4.910567485426736,
        totalDividendsReceived:0,
        totalDividendsReceivedPercent:0,
        totalEarnedAmount:100355*0.01,
        totalEarnedAmountPercent:-4.910567485426736,
        numberOfPropertiesInvestedIn:14,
        chart:[
            { 
                name:{ en:'Immeuble Basse Rue', fr:'Immeuble Basse Rue'},
                percent:11.56,
                price:11033,
                id:'1c70f109-31c1-4a5c-8aa7-dcde41124652'
            },
            { name:{ en:'Immeuble Palavas', fr:'Immeuble Palavas' }, percent:10.48, price:10000, id:'4455e754-c9a3-4152-8c91-9194d5cab929'},
            { name:{ en:'Immeuble Pépinières',fr:'Immeuble Pépinières'}, percent:2.1, price:2000, id:'4da57f51-7645-49eb-8e2e-791278b41e54'},
            { name:{ en:'Immeuble Lodève',fr:'Immeuble Lodève'}, percent:1.05, price:1000, id:'52847e3a-80c6-4621-9fed-582030ecb082'},
            { name:{ en:'Immeuble Capitaine Ferrand',fr:'Immeuble Capitaine Ferrand'}, percent:6.29, price:6000, id:'801a4423-aa05-4048-a56e-af1dddd28257'},
            { name:{ en:'Immeuble Charles Thomas I',fr:'Immeuble Charles Thomas I'}, percent:1.05, price:1000, id:'8051226f-0ca5-407a-a27d-980a312c4fb9'},
            { name:{ en:'Immeuble Dom Manuel II',fr:'Immeuble Dom Manuel II'}, percent:28.29, price:27000, id:'80b2efc8-37ef-4c7a-8a6f-937ea9b3e766'},
            { name:{ en:'Immeuble Belfort',fr:'Immeuble Belfort'}, percent:1.05, price:1000, id:'81a8ac7d-4887-4a0f-b6e1-5991fe872ec2'},
            { name:{ en:'Commerce Niemen',fr:'Commerce Niemen'}, percent:2.1, price:2000, id:'a3fc579e-07e7-48f6-9a03-54976fdffd8b'},
            { name:{ en:'Immeuble Bas Verson',fr:'Immeuble Bas Verson'}, percent:6.34, price:6054, id:'a5f295f8-e34a-4c27-9715-275247fd59f6'},
            { name:{ en:'Immeuble Long Pot',fr:'Immeuble Long Pot'}, percent:21.31, price:20340, id:'bdbd1c0b-9f81-4357-af9b-59b2d41a5cf9'},
            { name:{ en:'Immeuble Baraban',fr:'Immeuble Baraban'}, percent:2.1, price:2000, id:'c03335c6-1145-4da1-bd14-8275309a2817'},
            { name:{ en:'Immeuble Sainte-Foye',fr:'Immeuble Sainte-Foye'}, percent:3.14, price:3000, id:'c07ce93a-a7ae-4fbe-88ad-6d4610afbbb3'},
            { name:{ en:'Immeuble Bienfaisance',fr:'Immeuble Bienfaisance'}, percent:3.14, price:3000, id:'f6a34700-69a8-4b02-b9ca-3964085c49d2'}
        ],
    };
    this.data = stub;
  }

  public async firstUpdated(): Promise<void> {
    renderRepartitionChart(this.chartContainer, this.data);
    MDCList.attachTo(this.assetsList);
    MDCList.attachTo(this.liabilitiesList);
    this.menu = MDCMenu.attachTo(this.classSwitch);
    this.classSwitch.addEventListener('MDCMenu:selected', (e: Event) => {
        const event = e as CustomEvent<{ index: number; item: HTMLElement; }>;
        const detail = event.detail;
        const selected = detail.item.dataset.title;
        if(selected !== 'Real estate') { return; }
        this.selectedClass = selected ?? 'Real estate';
    });
  }

  public render(): void | TemplateResult {
    const assets = [
        {
            name: 'Savings',
            total: '4439€',
        },
        {
            name: 'Shares',
            total: '400€',
        },
        {
            name: 'Crypto',
            total: '$1,374.87',
        },
    ];

    const liabilities = [
        {
            name: 'Visa Premier',
            total: '-244.87€',
        },
        {
            name: 'Mortgage',
            total: '-155 772,31€'
        }
    ];
    return html`
      <div id="page" class="page" role="main">
        <div class="content-section-header">
            <p>Home</p>
            <div class="content-actions">
                ${this.isBlurred ? html`
                <button class="mdc-icon-button" @click=${() => { this.isBlurred = false; }}>
                    <div class="mdc-icon-button__ripple"></div>
                    <span class="mdc-icon-button__focus-ring"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>` : html`
                    <button class="mdc-icon-button" @click=${() => { this.isBlurred = true; }}>
                        <div class="mdc-icon-button__ripple"></div>
                        <span class="mdc-icon-button__focus-ring"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                </button>`}
            </div>
        </div>
        <div class="charts">
            <section class="real-estate mobile-hidden">
                <div class="real-estate-header mdc-menu-surface--anchor">
                    <h4 @click=${() => {
                        this.menu.open = true;
                    }}>${this.selectedClass}</h4>
                    <div class="mdc-menu class-switch mdc-menu-surface">
                        <ul class="mdc-deprecated-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                            <li class="mdc-deprecated-list-item" role="menuitem" data-title="Real estate">
                                <span class="mdc-deprecated-list-item__ripple"></span>
                                <span class="mdc-deprecated-list-item__text title">Real estate</span>
                            </li>
                            <li class="mdc-deprecated-list-item" role="menuitem" data-title="Crypto" disabled>
                                <span class="mdc-deprecated-list-item__ripple"></span>
                                <span class="mdc-deprecated-list-item__text title">Crypto</span>
                            </li>
                        </ul>
                    </div>
                    <div class="real-estate-actions">
                        <button class="mdc-icon-button ${this.chart === ChartTypes.repartition ? 'active' : ''}" role="tab" aria-selected=${this.chart === ChartTypes.repartition} tabindex="0" @click=${async() => {
                            this.chart = ChartTypes.repartition;
                            await this.updateComplete;
                            renderRepartitionChart(this.chartContainer, this.data);
                        }}>
                            <div class="mdc-icon-button__ripple"></div>
                            <span class="mdc-icon-button__focus-ring"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
                        </button>
                        <button class="mdc-icon-button ${this.chart === ChartTypes.breakdown ? 'active' : ''}" role="tab" tabindex="0" aria-selected=${this.chart === ChartTypes.breakdown} @click=${async() => {
                            this.chart = ChartTypes.breakdown;
                            await this.updateComplete;
                            renderBreakdown(this.chartContainer, this.data);
                        }}>
                            <div class="mdc-icon-button__ripple"></div>
                            <span class="mdc-icon-button__focus-ring"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-align-left"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
                        </button>
                    </div>
                </div>
                <div class="chart-container"></div>
            </section>
            <div class="right-column">
                <section class="assets-liabilities">
                    <div class="listing">
                        <h3 class="mdc-typography--subtitle1">Assets</h3>
                        <ul class="mdc-list assets-list mdc-list--two-line">
                            ${assets.map(asset => {
                                return html`
                                <li class="mdc-list-item mdc-ripple-upgraded" tabindex="0">
                                    <span class="mdc-list-item__text">
                                        <span class="mdc-list-item__primary-text">${asset.name}</span>
                                        <span class="mdc-list-item__secondary-text ${this.isBlurred ? 'blurry' : 'not-blurry'}">${asset.total}</span>
                                    </span>
                                </li>
                                `;
                            })}
                        </ul>
                    </div>
                    <div class="listing">
                        <h3 class="mdc-typography--subtitle1">Liabilities</h3>
                        <ul class="mdc-list liabilities-list mdc-list--two-line">
                            ${liabilities.map(liability => {
                                return html`
                                <li class="mdc-list-item mdc-ripple-upgraded" tabindex="0">
                                    <span class="mdc-list-item__text">
                                        <span class="mdc-list-item__primary-text">${liability.name}</span>
                                        <span class="mdc-list-item__secondary-text ${this.isBlurred ? 'blurry' : 'not-blurry'}">${liability.total}</span>
                                    </span>
                                </li>
                                `;
                            })}
                        </ul>
                    </div>
                </section>
                <h4>Bricks</h4>
                <ul class="mdc-list value-gain mdc-list--two-line">
                    <div>
                        <li class="mdc-list-item mdc-ripple-upgraded" tabindex="0">
                            <span class="mdc-list-item__text">
                                <span class="mdc-list-item__primary-text">Properties:</span>
                                <span class="mdc-list-item__secondary-text ${this.isBlurred ? 'blurry' : 'not-blurry'}">${this.data.numberOfPropertiesInvestedIn}</span>
                            </span>
                        </li>
                        <li class="mdc-list-item mdc-ripple-upgraded" tabindex="0">
                            <span class="mdc-list-item__text">
                                <span class="mdc-list-item__primary-text">Value:</span>
                                <span class="mdc-list-item__secondary-text ${this.isBlurred ? 'blurry' : 'not-blurry'}">${this.data.totalValueOfMyBricks}€</span>
                            </span>
                        </li>
                    </div>
                    <div>
                        <li class="mdc-list-item mdc-ripple-upgraded" tabindex="0">
                            <span class="mdc-list-item__text">
                                <span class="mdc-list-item__primary-text">Investment:</span>
                                <span class="mdc-list-item__secondary-text ${this.isBlurred ? 'blurry' : 'not-blurry'}">${this.data.totalEarnedAmount.toFixed(2)}€</span>
                            </span>
                        </li>

                        <li class="mdc-list-item mdc-ripple-upgraded" tabindex="0">
                            <span class="mdc-list-item__text">
                                <span class="mdc-list-item__primary-text">Capital gain:</span>
                                <span class="mdc-list-item__secondary-text ${this.isBlurred ? 'blurry' : 'not-blurry'}">${this.data.totalValueOfMyBricksPercent.toFixed(2)}%</span>
                            </span>
                        </li>
                    </div>
                </ul>
            </div>
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