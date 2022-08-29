import type { Subscription, User } from '@supabase/supabase-js';
import { Md5 } from 'ts-md5';

import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators.js';

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
	SettingsIcon 
} from './svg';

enum Pages {
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
	private user: User | null | undefined = undefined;
	@state()
	private emailHash = '';

	public authSubscription: Subscription | null = null;
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

	private prepareUser(user: User | null | undefined){
		if(!user) {
			return;
		}

		this.emailHash = Md5.hashStr(user?.email?.trim().toLowerCase() ?? '');
		this.user = user;

		return user;
	}

	constructor(path: string) {
		super();

		this.authSubscription = auth.onAuthStateChange((change, session) => {
			console.warn('authsub', session);
			switch(change) {
			  case 'USER_DELETED':
			  case 'SIGNED_OUT':
				this.user = undefined;
				break;
			  case 'SIGNED_IN':
			  case 'TOKEN_REFRESHED':
			  case 'USER_UPDATED':
				this.prepareUser(session?.user);
				this.load('home', session?.user);
				break;
			  case 'PASSWORD_RECOVERY':
				break;
			}
		}).data;

		this.routing = import('./pages').then(() => {
			return this.firstLoad(path);
		}).then(() => {
			// At this point of time, we should be able to do anything with the App.
			// @todo : fix darkmode toggle
		});
	}

	private async firstLoad(path: string): Promise<HTMLElement | null> {
		const user = this.prepareUser(auth.user());
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
				if(!user) {
					return await this.load(Pages.signUp, null);
				}

				if(path && customElements.get('ui-' + path)) {
					return await this.load(path === Pages.signUp ? Pages.home : path, user);
				}

				return await this.load(Pages.home, user);
			}
			default:
				return await this.load(Pages.signUp, null);
		}
	}

	private inactiveSidebarLinks(linkElement: HTMLLinkElement, e: Event) {
		const sidebar = linkElement.parentElement;
		if(sidebar) {
			const links = sidebar.querySelectorAll('a');
			links.forEach(link => link.classList.remove('active'));
		}
		linkElement.classList.add('active');
		e.preventDefault();
	}

	public render(): TemplateResult {
		return html`<div class="maia">
	<div class="app-container">
		<div class="app-header">
				<div class="app-header-left">
					<span class="app-icon">
						<a href="home" @click=${(e:Event) => {
							e.preventDefault();
							if(this.user) {
								this.load('home', this.user);
							}
						}}>
						${MaiaLogo}
						</a>
					</span>
					<p class="app-name"><a href="home" @click=${(e:Event) => {
						e.preventDefault();
						if(this.user) {
							this.load('home', this.user);
						}
					}}>Maia.</a></p>
					<div class="search-wrapper">
						<input class="search-input" type="text" placeholder="Search.">
						${SearchIcon}
					</div>
				</div>
				<div class="app-header-right">
					<button aria-label="notifications" class="mdc-icon-button notification-btn">
						<div class="mdc-icon-button__ripple"></div>
						<span class="mdc-icon-button__focus-ring"></span>
						${NotificationsIcon}
                	</button>
					<button aria-label="profile" class="profile-btn" @click=${() => {
						if(this.user) {
							this.load('account', this.user);
						} else {
							this.load('sign-up', this.user);
						}
					}}>
					${this.user ? html`
					<img src="https://www.gravatar.com/avatar/${this.emailHash}" />
					<button aria-label="logout" class="mdc-icon-button logout-btn" @click=${async () => {
						const { error } = await auth.signOut();
						if(error) {
							console.warn('error while logout', error);
						}
						this.user = null;
						this.load('sign-up', this.user);
					}}>
						<div class="mdc-icon-button__ripple"></div>
						<span class="mdc-icon-button__focus-ring"></span>
						${LogoutIcon}
					</button>
					` : html`
					<button aria-label="login" class="mdc-icon-button">
						<div class="mdc-icon-button__ripple"></div>
						<span class="mdc-icon-button__focus-ring"></span>
						${LoginIcon}
                	</button>`}
				</div>
				<button aria-label="messages" class="messages-btn">
					${MessagesCircle}
				</button>
			</div>
			<div class="app-content">
				<div class="app-sidebar">
					<a href="home" class="app-sidebar-link" @click=${(e: Event) => {
						if(!this.user) {
							e.preventDefault();
							return;
						}
						const link = e.currentTarget as HTMLLinkElement;
						this.inactiveSidebarLinks(link, e);
						this.load('home', this.user);
					}}>${HomeIcon}</a>
					<a href="settings" class="app-sidebar-link" @click=${(e: Event) => {
						if(!this.user) {
							e.preventDefault();
							return;
						}
						const link = e.currentTarget as HTMLLinkElement;
						this.inactiveSidebarLinks(link, e);
						this.load('settings', this.user);
					}}>${SettingsIcon}</a>
				</div>
				<div class="content-section" id="content"></div>
				${this.user ? html`
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
				</div>
				` : html``}
			</div>
		</div>
	</div>
</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'maia-app': MaiaApp;
	}
}