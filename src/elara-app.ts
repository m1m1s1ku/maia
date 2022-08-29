import '@shoelace-style/shoelace/dist/themes/light.css';

import { html, TemplateResult } from 'lit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement } from 'lit/decorators/custom-element.js';

import mimisiku from './mimisiku.png';

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
		return html`
<div class="maia">
	<div class="app-container">
		<div class="app-header">
			<div class="app-header-left">
				<span class="app-icon">
					<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						viewBox="0 0 103.59 76.05" style="enable-background:new 0 0 103.59 76.05;" xml:space="preserve">
						<style type="text/css">
							.glove {fill:#8A87A3;}
						</style>
						<path class="glove" d="M27.52,73.61C18.62,69.62,10.44,63.59,0,63.92c1.98-5.84,3.95-11.69,5.94-17.53c3.19-9.34,6.66-18.6,9.49-28.04
							c1.99-6.66,6.27-11.04,12.73-9.21c8.33,2.36,15.13,7.25,10.43,18.12c-0.83,1.91,0.18,4.61,0.33,6.95c1.09-1.01,2.17-2.05,3.29-2.97
							c1.39-1.14,2.02-1.78,4.1-2.79c2.66,6.58,2.62,7.68,0.83,10.24c-7.64,10.94-15.5,21.64-18.66,34.91
							C28.16,73.61,27.84,73.61,27.52,73.61z"/>
						<path class="glove" d="M76.07,64.89c8.9-3.99,17.08-10.02,27.52-9.69c-1.98-5.84-3.95-11.69-5.94-17.53
							c-3.19-9.34-6.66-18.6-9.49-28.04c-1.99-6.66-6.27-11.04-12.73-9.21C67.1,2.78,60.3,7.67,65,18.54c0.83,1.91-0.18,4.61-0.33,6.95
							c-1.09-1.01-2.05-2.22-3.29-2.97c-1.97-1.19-4.12-2.06-6.2-3.07c0.35,3.56-0.52,7.96,1.27,10.52c7.64,10.94,15.5,21.64,18.66,34.91
							C75.43,64.89,75.75,64.89,76.07,64.89z"/>
					</svg>
				</span>
				<p class="app-name">Maia.</p>
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
				<button class="add-btn" title="Add New Project">
					<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
					<line x1="12" y1="5" x2="12" y2="19" />
					<line x1="5" y1="12" x2="19" y2="12" /></svg>
				</button>
				<button class="notification-btn">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell">
					<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
					<path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
				</button>
				<button class="profile-btn">
					<img src="${mimisiku}" />
					<span>Léonard C.</span>
				</button>
				</div>
				<button class="messages-btn">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle">
					<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
				</button>
			</div>
			<div class="app-content">
				<div class="app-sidebar">
					<a href="" class="app-sidebar-link active">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home">
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
						<polyline points="9 22 9 12 15 12 15 22" /></svg>
					</a>
					<a href="" class="app-sidebar-link">
						<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-pie-chart" viewBox="0 0 24 24">
						<defs />
						<path d="M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z" />
						</svg>
					</a>
					<a href="" class="app-sidebar-link">
						<svg class="link-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="feather feather-settings" viewBox="0 0 24 24">
						<defs />
						<circle cx="12" cy="12" r="3" />
						<path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
						</svg>
					</a>
				</div>
				<div class="projects-section">
					<div class="projects-section-header">
						<p>Dashboard</p>
					</div>
					<div class="project-boxes"></div>
				</div>
				<div class="messages-section">
					<button class="messages-close">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
						<circle cx="12" cy="12" r="10" />
						<line x1="15" y1="9" x2="9" y2="15" />
						<line x1="9" y1="9" x2="15" y2="15" /></svg>
					</button>
					<div class="projects-section-header">
						<p>Messages</p>
					</div>
					<div class="messages">
						<div class="message-box">
							<img src="https://i.ibb.co/xjPP7tK/76a5a4e1-7aeb-47e9-b55d-60c570c09f52.jpg" alt="profile image">
							<div class="message-content">
								<div class="message-header">
								<div class="name">WolveBan</div>
								<div class="star-checkbox">
									<input type="checkbox" id="star-1">
									<label for="star-1">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
										<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
									</label>
								</div>
								</div>
								<p class="message-line">
								[REDACTED]
								</p>
								<p class="message-line time">
								Aug, 29
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'elara-app': ElaraApp;
	}
}