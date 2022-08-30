import { html, TemplateResult } from 'lit-html';
import { query } from 'lit/decorators.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { Maia } from '../core/maia';

import Page from '../core/strategies/Page';
import supabase from '../supabase';

// @todo : cleanup / styling
@customElement('ui-sign-up')
export class SignUpController extends Page {
    @query('.email-field')
    private emailField!: HTMLLabelElement;
    @query('.password-field')
    private passwordField!: HTMLLabelElement;

    protected async firstUpdated(): Promise<void> {
        const { MDCTextField } = await import('@material/textfield');
        MDCTextField.attachTo(this.emailField);
        MDCTextField.attachTo(this.passwordField);
    }

    private async signUpWithEmail() {
        Maia()?.listenForAuthChange();

        const email = this.emailField.querySelector('input')?.value;
        const password = this.passwordField.querySelector('input')?.value;
        if(!email || !password) {
            // Show toast : error
            return;
        }

        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if(error) {
            // Show toast : error
            return;
        }

        // toast : Please check your email

        // redirect to account
        console.warn('registered', user);
    }

    private async signInWithGithub() {
        Maia()?.listenForAuthChange();

        const { user, error } = await supabase.auth.signIn({
            provider: 'github',
        });
        console.warn('signed in with github', user, error);
    }

    private async signInWithEmail() {
        Maia()?.listenForAuthChange();

        const email = this.emailField.querySelector('input')?.value;
        const password = this.passwordField.querySelector('input')?.value;
        if(!email || !password) {
            // Show toast
            return;
        }

        const { user, error } = await supabase.auth.signIn({
            email,
            password,
        });

        if(error) {
            // Show toast
            return;
        }

        console.warn('logged in', user);
    }

    public render(): void | TemplateResult {
        return html`
        <div id="page" class="page" role="main">
            <div class="content-section-header">
                <p>Connect</p>
            </div>
            <form class="login-form" @submit=${(e: Event) => {
                e.preventDefault();
            }}>
                <label class="email-field mdc-text-field mdc-text-field--filled">
                    <span class="mdc-text-field__ripple"></span>
                    <input type="text" autocomplete="username" class="mdc-text-field__input" aria-labelledby="maia-email">
                    <span class="mdc-floating-label" id="maia-email">Email</span>
                    ${this.lineRipple}
                </label>
                <label class="password-field mdc-text-field mdc-text-field--filled">
                    <span class="mdc-text-field__ripple"></span>
                    <input autocomplete="current-password" type="password" class="mdc-text-field__input" aria-labelledby="maia-password">
                    <span class="mdc-floating-label" id="maia-password">Password</span>
                    ${this.lineRipple}
                </label>
                <div class="login-actions">
                    <button aria-label="Sign up" class="mdc-button mdc-button--raised" @click=${() => this.signUpWithEmail()}>
                        ${this.buttonRipple}
                        Sign up
                    </button>
                    <button aria-label="Sign in" type="submit" class="mdc-button mdc-button--raised" @click=${() => this.signInWithEmail()}>
                        ${this.buttonRipple}
                        Sign in
                    </button>
                    <button aria-label="Github" type="submit" class="mdc-button mdc-button--raised" @click=${() => this.signInWithGithub()}>
                        ${this.buttonRipple}
                        Github
                    </button>
                </div>
            </form>
        </div>
        `;
    }

    private get lineRipple() {
        return html`<span class="mdc-line__ripple"></span>` ;
    }

    private get buttonRipple() {
        return html`<span class="mdc-button__ripple"></span>` ;
    }
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-sign-up': SignUpController;
	}
}