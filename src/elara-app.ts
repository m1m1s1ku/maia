import '@shoelace-style/shoelace/dist/themes/light.css';

import { html, TemplateResult } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement } from 'lit/decorators/custom-element.js';
import logo from './assets/logo.png';

import Root from './core/strategies/Root';

@customElement('elara-app')
export class ElaraApp extends Root {
	public static readonly is: string = 'elara-app';

	public get loadables(): string[] {
		return [];
	}

	public get needed(): string[] {
		return [];
	}

	public render(): TemplateResult {
		return html`<div id="content" class="content-skeleton">
			<img src="${logo}" alt="Maia logo" />
		</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'elara-app': ElaraApp;
	}
}