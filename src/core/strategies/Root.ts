import { LitElement, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { load, Router, bootstrap } from '../elara';

/**
 * Abtract <*-app> component strategy
 *
 * @export
 * @abstract
 * @class Root
 * @extends {LitElement}
 */
export default abstract class Root extends LitElement {
	/**
	 * A really simple router
	 * 
	 * Could (or should) be replaced by Crayon (https://github.com/alshdavid/crayon) depending on usage
	 *
	 * @memberof Root
	 */
	public router = Router();

	@property({reflect: true, type: String})
	public route: string;

	@query('#content')
	protected _content: HTMLDivElement;

	/**
	 * Inside JS dark-mode handling
	 *
	 * Could be used for SVG animations, example : (https://github.com/Ghostfly/cheno-website/blob/master/src/elara-app.ts#L109)
	 * @private
	 * @memberof Root
	 */
	private _queries = {
		DARK: '(prefers-color-scheme: dark)',
		LIGHT: '(prefers-color-scheme: light)',
	};

	private _onHashChangeListener: () => void;

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

		if(window.matchMedia(this._queries.DARK).matches){ document.body.classList.add('night'); }

		if(window.matchMedia(this._queries.LIGHT).matches){ document.body.classList.add('day'); }

		this._onHashChangeListener = this._onHashChange.bind(this);
		window.addEventListener('hashchange', this._onHashChangeListener, { passive: true });
	}

	public disconnectedCallback(): void {
		super.disconnectedCallback();
		window.removeEventListener('hashchange', this._onHashChangeListener);
	}
	
	protected createRenderRoot(): this { return this; }

	/**
	 * Toggle dark|light (lightswitch)
	 *
	 * @returns
	 * @memberof Root
	 */
	public switchColors(): {
		day: boolean;
		night: boolean;
	}{
		const day = document.body.classList.contains('day');
		const night = document.body.classList.contains('night');

		if(day){
			document.body.classList.remove('day');
			document.body.classList.add('night');
		}

		if(night){
			document.body.classList.remove('night');
			document.body.classList.add('day');
		}

		return {
			day,
			night
		};
	}

	public firstUpdated(): void {
		const hashEvent = new HashChangeEvent('hashchange', {
			newURL: location.hash,
			oldURL: null
		});

		this._onHashChange(hashEvent);
	}

	protected async _onHashChange(event: HashChangeEvent): Promise<void> {
		const route = this.router.hashChange(event);
		this.route = route;

		await this.load(route);
	}
		
	public async load(route: string): Promise<void> {
		this._content.scrollTop = 0;
		
		return load(route, this._content);
	}
}