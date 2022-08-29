import { MDCTextField } from '@material/textfield';
import { ApiError, User } from '@supabase/supabase-js';
import { html, TemplateResult } from 'lit-html';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { query } from 'lit/decorators.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { customElement } from 'lit/decorators/custom-element.js';

import Page from '../core/strategies/Page';
import supabase from '../supabase';

@customElement('ui-sign-up')
export class SignUpController extends Page {
    private user: User | null = null;
    private error: ApiError | null = null;

    @query('.email-field')
    private emailField!: HTMLLabelElement;
    @query('.password-field')
    private passwordField!: HTMLLabelElement;

    protected firstUpdated(): void {
        MDCTextField.attachTo(this.emailField);
        MDCTextField.attachTo(this.passwordField);
    }

    private async signUpWithEmail() {
        const email = this.emailField.querySelector('input')?.value;
        const password = this.passwordField.querySelector('input')?.value;
        if(!email || !password) {
            // Show toast
            return;
        }

        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });
        this.user = user;
        this.error = error;

        if(error) {
            // Show toast
            return;
        }

        // redirect to account
        console.warn('registered', user);
    }

    private async signInWithEmail() {
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
        this.user = user;
        this.error = error;

        if(error) {
            // Show toast
            return;
        }

        // redirect to account
        console.warn('registered', user);
    }

    public render(): void | TemplateResult {
        return html`
        <div id="page" class="page" role="main">
            <div class="content-section-header">
                <p>Connect</p>
            </div>
            <div class="login-form">
                <label class="email-field mdc-text-field mdc-text-field--filled">
                    <span class="mdc-text-field__ripple"></span>
                    <input type="text" class="mdc-text-field__input" aria-labelledby="my-label">
                    <span class="mdc-floating-label" id="my-label">Email</span>
                    <span class="mdc-line-ripple"></span>
                </label>
                <label class="password-field mdc-text-field mdc-text-field--filled">
                    <span class="mdc-text-field__ripple"></span>
                    <input type="password" class="mdc-text-field__input" aria-labelledby="my-label">
                    <span class="mdc-floating-label" id="my-label">Password</span>
                    <span class="mdc-line-ripple"></span>
                </label>
                <div class="login-actions">
                    <button class="mdc-button mdc-button--raised" @click=${() => this.signUpWithEmail()}>
                        <span class="mdc-button__ripple"></span>
                        Sign up
                    </button>
                    <button class="mdc-button mdc-button--raised" @click=${() => this.signInWithEmail()}>
                        <span class="mdc-button__ripple"></span>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
        `;
    }
}

declare global {
	interface HTMLElementTagNameMap {
		'ui-sign-up': SignUpController;
	}
}