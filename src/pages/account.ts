import { html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import Page from '../core/strategies/Page';
import supabase from '../supabase';

function prettyDate(time: string | undefined) {
    if(!time) {
        return;
    }

    const date = new Date((time || '').replace(/-/g, '/').replace(/[TZ]/g, ' ')),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

    return day_diff == 0 && (
    diff < 60 && 'just now' || diff < 120 && '1 minute ago' || diff < 3600 && Math.floor(diff / 60) + ' minutes ago' || diff < 7200 && '1 hour ago' || diff < 86400 && Math.floor(diff / 3600) + ' hours ago') || day_diff == 1 && 'Yesterday' || day_diff < 7 && day_diff + ' days ago' || day_diff < 31 && Math.ceil(day_diff / 7) + ' weeks ago';
}

@customElement('ui-account')
export class AccountController extends Page {
  public render(): void | TemplateResult {
    const user = supabase.auth.user();
    return html`
      <div id="page" class="page" role="main">
        <div class="content-section-header">
            <p>Account</p>
        </div>
        <section class="user-info">
            <p>Email: ${user?.email}</p>
            <p>Created at: ${prettyDate(user?.created_at)}</p>
            <p>Last sign in: ${prettyDate(user?.last_sign_in_at)}</p>
        </section>
      </div>
    `;
  }
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-account': AccountController;
	}
}