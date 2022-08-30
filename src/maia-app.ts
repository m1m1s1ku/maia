import './index.scss';

import type { Subscription, User } from '@supabase/supabase-js';
import { Md5 } from 'ts-md5';

import { html, TemplateResult, nothing, render } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { guard } from 'lit/directives/guard.js';

import Root from './core/strategies/Root';

import { auth } from './supabase';

import WolveBan from './assets/wolveban.jpg';

import {
	MaiaLogo, 
	CloseCircle, 
	HomeIcon, 
	LoginIcon, 
	LogoutIcon, 
	MessagesCircle, 
	NotificationsIcon, 
	SearchIcon, 
	SettingsIcon, 
	MaiaLogoFull
} from './svg';

export enum Pages {
	root = '',
	home = 'home',
	account = 'account',
	signUp = 'sign-up',
	settings = 'settings',
}

@customElement('maia-app')
export class MaiaApp extends Root {
	public static readonly is: string = 'maia-app';

	@state()
	private user: User | null = null;

	public subscription: Subscription | null = null;
	public routing: Promise<void>;

	public get loadables(): string[] {
		return [];
	}

	public get needed(): string[] {
		return [
			'ui-home',
			'ui-account',
			'ui-sign-up',
			'ui-settings',
		];
	}

	public listenForAuthChange(): void {
		if(this.subscription) { return; }

		this.subscription = auth.onAuthStateChange((change, session) => {
			// console.warn('authsub', session);
			switch(change) {
			  case 'USER_DELETED':
			  case 'SIGNED_OUT':
				this.user = null;
				break;
			  case 'SIGNED_IN':
			  case 'TOKEN_REFRESHED':
			  case 'USER_UPDATED':
				this.user = session?.user ?? null;
				this.load('home', this.user);
				break;
			  case 'PASSWORD_RECOVERY':
				break;
			}
		}).data;
	}

	constructor(path: string) {
		super();

		this.listenForAuthChange();

		// @todo : fix darkmode toggle
		this.routing = import('./pages').then(() => {
			return this.firstLoad(path);
		}).then(() => {
			// At this point of time, we should be able to do anything with the App.
		});
	}

	private async firstLoad(path: string): Promise<HTMLElement | null> {
		this.user = auth.user();

		if(path === undefined || path === null) {
			path = Pages.root;
		}

		path = path.startsWith('/') ? path.slice(1) : path;

		switch(path) {
			case Pages.root:
			case Pages.home:
			case Pages.account:
			case Pages.signUp:
			case Pages.settings: {
				if(!this.user) { return await this.load(Pages.signUp, null); }

				if(path && customElements.get('ui-' + path)) {
					const isSignup = path === Pages.signUp;
					// Logged in but trying to register.
					if(isSignup) {
						path = Pages.home;
					}
					return await this.load(path, this.user);
				}

				return await this.load(Pages.home, this.user);
			}
			default:
				return await this.load(Pages.signUp, null);
		}
	}

	private redirect(page: Pages, link?: HTMLElement): void {
		const links = this.querySelectorAll('.app-sidebar a');
		links.forEach(link => link.classList.remove('active'));

		const to = this.user ? page : Pages.signUp;
		this.load(to, this.user);

		if(link) {
			link.classList.add('active');
		}
	}

	public render(): TemplateResult {
		return html`
		<div class="maia">
			<div class="app-container">
				${this.appHeader}
				<div class="app-content">
					${this.sidebarSection}
					<div class="content-section" id="content"></div>
					${this.messagesSection}
				</div>
			</div>
		</div>`;
	}

	private get mdcIcon(): TemplateResult {
		return html`
		<div class="mdc-icon-button__ripple"></div>
		<span class="mdc-icon-button__focus-ring"></span>`;
	}

	private preventAndNavigate(e: Event, page: Pages): void {
		e.preventDefault();
		this.redirect(page);
	}

	private get appHeader(): TemplateResult {
		return html`
		<div class="app-header">
			<div class="app-header-left">
				<span class="app-icon">
					<a href="home" @click=${(e: Event) => this.preventAndNavigate(e, Pages.home)}>${MaiaLogo}</a>
				</span>
				<p class="app-name"><a href="home" @click=${(e: Event) => this.preventAndNavigate(e, Pages.home)}>Maia.</a></p>
				<div class="search-wrapper">
					<input class="search-input" type="text" placeholder="Search.">
					${SearchIcon}
				</div>
			</div>
			<div class="app-header-right">
				${when(this.user, () => html`
					<button aria-label="notifications" class="mdc-icon-button notification-btn">
						${this.mdcIcon}
						${NotificationsIcon}
					</button>
					<button aria-label="profile" class="profile-btn" @click=${(e: Event) => this.preventAndNavigate(e, Pages.account)}>
					    ${guard([this.user], () => html`<img src="https://www.gravatar.com/avatar/${Md5.hashStr(this.user?.email?.trim().toLowerCase() ?? '')}" alt="Gravatar" />`)}
					</button>
					<button aria-label="logout" class="mdc-icon-button logout-btn" @click=${() => this.signOut()}>
						${this.mdcIcon}
						${LogoutIcon}
					</button>`, 
					() => html`
					<button aria-label="login" class="mdc-icon-button">
						${this.mdcIcon}
						${LoginIcon}
					</button>
				`)}
			</div>
			${when(this.user, () => html`<button aria-label="messages" class="messages-btn">${MessagesCircle}</button>`)}
		</div>`;
	}

	private async signOut(): Promise<void> {
		this.subscription?.unsubscribe();
		const { error } = await auth.signOut();
		if(error) { console.warn('error while logout', error); }
		this.user = null;
		this.load(Pages.signUp, this.user);
	}

	private get sidebarSection(): TemplateResult {
		return html`
		<div class="app-sidebar">
			<a href="home" class="app-sidebar-link ${location.pathname === '/' +Pages.home ? 'active' : ''}" @click=${(e: Event) => {
				e.preventDefault();
				this.redirect(Pages.home,  e.currentTarget as HTMLLinkElement);
			}}>${HomeIcon}</a>
			<a href="settings" class="app-sidebar-link ${location.pathname === '/' +Pages.settings}" @click=${(e: Event) => {
				e.preventDefault();
				this.redirect(Pages.settings,  e.currentTarget as HTMLLinkElement);
			}}>${SettingsIcon}</a>
		</div>`;
	}

	private get messagesSection(): symbol | TemplateResult {
		return when(this.user, () => html`
		<div class="messages-section">
			<button class="messages-close">${CloseCircle}</button>
			<div class="content-section-header">
				<p>Messages</p>
			</div>
			<div class="messages">
				<div class="message-box">
					<img src="${WolveBan}" alt="profile image">
					<div class="message-content">
						<div class="message-header">
							<div class="name">WolveBan</div>
						</div>
						<p class="message-line">[REDACTED]</p>
						<p class="message-line time">Aug, 29</p>
					</div>
				</div>
			</div>
		</div>`, 
		() => nothing);
	}

	public showLoader(): void {
		render(html`<div id="loader" class="loader"><div class="handler-content"><div id="spinner" class="spinner large">${MaiaLogoFull}</div></div></div>`, document.body, { host: this });
	}

	public async showTime(): Promise<void> {
		const duration = 1200;
		const loader = document.body.querySelector('#loader');
		if(!loader) { return; }
		
		const fadeOut = loader.animate({ opacity: [1, 0] }, duration);

		await new Promise(resolve => {
			if (document.body.querySelector('maia-app')) { return; }
			document.body.appendChild(this);

			setTimeout(() => {
				if (!loader.parentElement) { return; }

				loader.parentElement.removeChild(loader);
				resolve(undefined);
			}, duration / 2);
		});

		await fadeOut.finished;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'maia-app': MaiaApp;
	}
}