import { User } from '@supabase/supabase-js';
import { LitElement, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { load, bootstrap } from '../maia';

/**
 * Abtract <*-app> component strategy
 *
 * @export
 * @abstract
 * @class Root
 * @extends {LitElement}
 */
export default abstract class Root extends LitElement {
	@property({reflect: true, type: String})
	public route!: string | null;

	@query('#content')
	protected _content!: HTMLDivElement;

	/**
	 * Inside JS dark-mode handling
	 *
	 * @private
	 * @memberof Root
	 */
	private _queries = {
		DARK: '(prefers-color-scheme: dark)',
		LIGHT: '(prefers-color-scheme: light)',
	};

	// Global loader control
	// Needed for "progressive" app load
	public abstract get needed(): string[];
	// Async components
	public abstract get loadables(): string[];

	// Inside HTML app-component. (light-dom for easy styling!)
	public abstract render(): TemplateResult;

	/**
	 * Used by boot.js to make a real app-loader
	 *
	 * @readonly
	 * @memberof Root
	 */
	public get bootstrap(): Promise<unknown[]> {
		return bootstrap(this.loadables, this);
	}

	public connectedCallback(): void {
		super.connectedCallback();

		if(window.matchMedia(this._queries.DARK).matches){ document.documentElement.classList.add('night'); }
		if(window.matchMedia(this._queries.LIGHT).matches){ document.documentElement.classList.add('day'); }
	}
	
	protected createRenderRoot(): this { return this; }

	public async load(route: string | null, user?: User | null): Promise<void> {
		if(!this._content) {
			// Workaround, boot will start routing asap (onDomLoaded)
			// enforce LitElement update to happen before loading.
			this.connectedCallback();
			await this.updateComplete;
		}

		// ScrollTop
		// @todo : Add "is-needed" handling from loadable component
		if(this._content && this._content.scrollTop !== 0) {
			this._content.scrollTop = 0;
		}

		return load(route, this._content, user);
	}
}