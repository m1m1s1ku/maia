import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import Page from '../core/strategies/Page';
import { BinanceLogo, BricksLogo, MPPLogo, SaveIcon } from '../svg';

@customElement('ui-settings')
export class SettingsController extends Page {
  public render(): void | TemplateResult {
    return html`
      <div id="page" class="page" role="main">
        <div class="content-section-header">
            <p>Settings</p>
        </div>
        <div>
            <h3>Connectors</h3>
            <section class="connector">
                ${BricksLogo}
                <form>
                    <label class="email-field mdc-text-field mdc-text-field--filled">
                        <span class="mdc-text-field__ripple"></span>
                        <input type="text" class="mdc-text-field__input" aria-labelledby="bricks-email">
                        <span class="mdc-floating-label" id="bricks-email">Email</span>
                        <span class="mdc-line-ripple"></span>
                    </label>
                    <label class="email-field mdc-text-field mdc-text-field--filled">
                        <span class="mdc-text-field__ripple"></span>
                        <input autocomplete="off" type="password" class="mdc-text-field__input" aria-labelledby="bricks-password">
                        <span class="mdc-floating-label" id="bricks-password">Password</span>
                        <span class="mdc-line-ripple"></span>
                    </label>
                </form>
            </section>
            <section class="connector">
                ${MPPLogo}
                <form>
                    <label class="email-field mdc-text-field mdc-text-field--filled">
                        <span class="mdc-text-field__ripple"></span>
                        <input type="text" class="mdc-text-field__input" aria-labelledby="mpp-email">
                        <span class="mdc-floating-label" id="bricks-email">Email</span>
                        <span class="mdc-line-ripple"></span>
                    </label>
                    <label class="email-field mdc-text-field mdc-text-field--filled">
                        <span class="mdc-text-field__ripple"></span>
                        <input autocomplete="off" type="password" class="mdc-text-field__input" aria-labelledby="mpp-password">
                        <span class="mdc-floating-label" id="bricks-password">Password</span>
                        <span class="mdc-line-ripple"></span>
                    </label>
                </form>
            </section>
            <section class="connector">
                ${BinanceLogo}
                <form>
                    <label class="email-field mdc-text-field mdc-text-field--filled">
                        <span class="mdc-text-field__ripple"></span>
                        <input type="text" class="mdc-text-field__input" aria-labelledby="binance-apikey">
                        <span class="mdc-floating-label" id="binance-apikey">APIKey</span>
                        <span class="mdc-line-ripple"></span>
                    </label>
                    <label class="email-field mdc-text-field mdc-text-field--filled">
                        <span class="mdc-text-field__ripple"></span>
                        <input autocomplete="off"  type="password" class="mdc-text-field__input" aria-labelledby="binance-secret">
                        <span class="mdc-floating-label" id="binance-secret">Secret</span>
                        <span class="mdc-line-ripple"></span>
                    </label>
                </form>
            </section>
            <button aria-label="Save" class="mdc-button mdc-button--raised">
                <span class="mdc-button__ripple"></span>
                ${SaveIcon}
            </button>
        </div>
      </div>
    `;
  }
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-settings': SettingsController;
	}
}