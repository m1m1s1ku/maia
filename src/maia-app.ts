import { Subscription, User } from '@supabase/supabase-js';
import { html, TemplateResult } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement } from 'lit/decorators/custom-element.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { state } from 'lit/decorators.js';

import Root from './core/strategies/Root';

import './pages/index';

import supabase from './supabase';

// @ts-expect-error shitty lib, see to replace
import MD5 from 'md5.js';

@customElement('maia-app')
export class MaiaApp extends Root {
	public static readonly is: string = 'maia-app';

	@state()
	private user: User | null | undefined = undefined;
	@state()
	private emailHash = '';

	public authSubscription: Subscription | null = null;

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

	constructor(path: string) {
		super();
		this.authSubscription = supabase.auth.onAuthStateChange((change, session) => {
			console.warn('authsub', session);
			switch(change) {
			  case 'USER_DELETED':
			  case 'SIGNED_OUT':
				this.user = undefined;
				break;
			  case 'SIGNED_IN':
			  case 'TOKEN_REFRESHED':
			  case 'USER_UPDATED':
				this.user = session?.user;
				if(this.user) {
				  this.emailHash = new MD5().update(session?.user?.email?.trim().toLowerCase() ?? '').digest('hex');
				}
				break;
			  case 'PASSWORD_RECOVERY':
				break;
			}
		}).data;

		this.updateComplete.then(() => {
			path = path.slice(1);

			switch(path) {
				case '':
				case 'home':
				case 'account':
				case 'sign-up':
				case 'settings':
				default:
					if(this.user) {
						const hasComponent = customElements.get('ui-' + path);
						if(hasComponent){
							this.load(path);
							return;
						}
						this.load('home');
						return;
					}

					this.load('sign-up');
			}
		});
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
								this.load('home');
							}
						}}>
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
								viewBox="0 0 103.59 76.05" style="enable-background:new 0 0 103.59 76.05;" xml:space="preserve">
								<style type="text/css">.glove {fill:#8A87A3;}</style>
								<path class="glove" d="M27.52,73.61C18.62,69.62,10.44,63.59,0,63.92c1.98-5.84,3.95-11.69,5.94-17.53c3.19-9.34,6.66-18.6,9.49-28.04
									c1.99-6.66,6.27-11.04,12.73-9.21c8.33,2.36,15.13,7.25,10.43,18.12c-0.83,1.91,0.18,4.61,0.33,6.95c1.09-1.01,2.17-2.05,3.29-2.97
									c1.39-1.14,2.02-1.78,4.1-2.79c2.66,6.58,2.62,7.68,0.83,10.24c-7.64,10.94-15.5,21.64-18.66,34.91
									C28.16,73.61,27.84,73.61,27.52,73.61z"/>
								<path class="glove" d="M76.07,64.89c8.9-3.99,17.08-10.02,27.52-9.69c-1.98-5.84-3.95-11.69-5.94-17.53
									c-3.19-9.34-6.66-18.6-9.49-28.04c-1.99-6.66-6.27-11.04-12.73-9.21C67.1,2.78,60.3,7.67,65,18.54c0.83,1.91-0.18,4.61-0.33,6.95
									c-1.09-1.01-2.05-2.22-3.29-2.97c-1.97-1.19-4.12-2.06-6.2-3.07c0.35,3.56-0.52,7.96,1.27,10.52c7.64,10.94,15.5,21.64,18.66,34.91
									C75.43,64.89,75.75,64.89,76.07,64.89z"/>
							</svg>
						</a>
					</span>
					<p class="app-name"><a href="home" @click=${(e:Event) => {
						e.preventDefault();
						if(this.user) {
							this.load('home');
						}
					}}>Maia.</a></p>
					<div class="search-wrapper">
						<input class="search-input" type="text" placeholder="Search.">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-search" viewBox="0 0 24 24">
							<defs></defs>
							<circle cx="11" cy="11" r="8"></circle>
							<path d="M21 21l-4.35-4.35"></path>
						</svg>
					</div>
				</div>
				<div class="app-header-right">
					<button class="mdc-icon-button notification-btn">
						<div class="mdc-icon-button__ripple"></div>
						<span class="mdc-icon-button__focus-ring"></span>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell">
							<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
							<path d="M13.73 21a2 2 0 0 1-3.46 0" />
						</svg>
                	</button>
					<button class="profile-btn" @click=${() => {
						if(this.user) {
							this.load('account');
						} else {
							this.load('sign-up');
						}
					}}>
					${this.user ? html`
					<img src="https://www.gravatar.com/avatar/${this.emailHash}" />
					<button class="mdc-icon-button logout-btn" @click=${async () => {
						const { error } = await supabase.auth.signOut();
						if(error) {
							console.warn('error while logout', error);
						}
						this.user = null;
						this.load('sign-up');
					}}>
						<div class="mdc-icon-button__ripple"></div>
						<span class="mdc-icon-button__focus-ring"></span>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
							<polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
						</svg>
					</button>
					` : html`
					<button class="mdc-icon-button">
						<div class="mdc-icon-button__ripple"></div>
						<span class="mdc-icon-button__focus-ring"></span>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>`}
                	</button>
				</div>
				<button class="messages-btn">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle">
						<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
					</svg>
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
						this.load('home');
					}}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
							<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
					</a>
					<a href="settings" class="app-sidebar-link" @click=${(e: Event) => {
						if(!this.user) {
							e.preventDefault();
							return;
						}
						const link = e.currentTarget as HTMLLinkElement;
						this.inactiveSidebarLinks(link, e);
						this.load('settings');
					}}>
						<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-settings" viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="3" />
							<path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
						</svg>
					</a>
				</div>
				<div class="content-section" id="content"></div>
				${this.user ? html`
				<div class="messages-section">
					<button class="messages-close">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
						<circle cx="12" cy="12" r="10" />
						<line x1="15" y1="9" x2="9" y2="15" />
						<line x1="9" y1="9" x2="15" y2="15" /></svg>
					</button>
					<div class="content-section-header">
						<p>Messages</p>
					</div>
					<div class="messages">
						<div class="message-box">
							<img src="https://i.ibb.co/xjPP7tK/76a5a4e1-7aeb-47e9-b55d-60c570c09f52.jpg" alt="profile image">
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