import { User } from '@supabase/supabase-js';
import { MaiaApp, Pages } from '../maia-app';

export interface UpdatableElement extends HTMLElement {
    requestUpdate(name?: PropertyKey, oldValue?: unknown): Promise<unknown>;
}
export interface LoadableElement extends UpdatableElement { loaded: boolean }

export function Maia(): MaiaApp | null { return document.querySelector('maia-app'); }

export function bootstrap(loadables: string[], host: HTMLElement): Promise<unknown[]> {
    const loadPromises = [];
    for(const element of loadables){
        const load = new Promise((resolve) => {
            const elem = host.querySelector(element) as LoadableElement;
            const config = { attributes: true };
            const observer = new MutationObserver((mutation) => {
                if(!mutation.length){ return; }
                if (mutation[0].type == 'attributes' && mutation[0].attributeName === 'loaded') {
                    observer.disconnect();
                    resolve(null);
                }
            });
            observer.observe(elem, config);
        });
        
        loadPromises.push(
            customElements.whenDefined(element), 
            load
        );
    }
    
    return Promise.all(loadPromises);
}

export async function load(route: string | null, content: HTMLElement | null, user?: User | null): Promise<HTMLElement | null> {
    if(!content){
        throw new Error('Fatal, LitElement not ready.');
    }

    if(user) {
        route = route ?? Pages.home;
    } else {
        route = Pages.signUp;
    }

    const defaultTitle = 'Maia.';
    const componentName = 'ui-' + route;

    const Component = customElements.get(componentName) ?? customElements.get('ui-sign-up');

    content.classList.remove('full-width');

    const loaded = Component ? new Component() : null; 

    document.title = defaultTitle;

    window.scrollTo(0,0);

    const removeChilds = (parent: HTMLElement) => {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
    };

    if(!loaded){ return null; }

    removeChilds(content);
    content.appendChild(loaded);

    return loaded;
}
