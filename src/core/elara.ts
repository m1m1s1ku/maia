import { ElaraApp } from '../elara-app';
import { pulseWith } from './animations';
import Page from './strategies/Page';

export interface UpdatableElement extends HTMLElement {
    requestUpdate(name?: PropertyKey, oldValue?: unknown): Promise<unknown>;
}
export interface LoadableElement extends UpdatableElement { loaded: boolean }

export function Elara(): ElaraApp { return document.querySelector('elara-app'); }

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
        loadPromises.push(load);
    }
    
    return Promise.all(loadPromises);
}

export async function load(route: string, content: HTMLElement): Promise<void> {
    if(!route){
        return;
    }

    const defaultTitle = 'XXX';
    const titleTemplate = '%s | ' + defaultTitle;

    const Component = customElements.get('ui-' + route);
    content.classList.remove('full-width');

    const NotFound = customElements.get('ui-not-found');
    const loaded = Component ? new Component() : new NotFound(route);

    const willLoad = loaded as Page;

    if(willLoad.head && willLoad.head.title){
        document.title = titleTemplate.replace('%s', willLoad.head.title);
    } else {
        document.title = defaultTitle;
    }
    content.appendChild(loaded);
    
    if(loaded instanceof NotFound){
        throw new Error(route);
    }

    window.scrollTo(0,0);

    const handle = window.requestAnimationFrame(() => {
        const pageContent = willLoad.querySelector('div');
        if(!pageContent){
            cancelAnimationFrame(handle);
            return;
        }

        const animation = pulseWith(300);			
        pageContent.animate(animation.effect, animation.options);
    });
}

type ElaraRouter = {
    redirect: (url: string, target?: string) => boolean;
    navigate: (route: string) => boolean;
    hashChange(event: HashChangeEvent): string | null;
};

export function Router(): ElaraRouter {
    return {
        redirect: (url: string, target = '_blank'): boolean => {
            return !!window.open(url, target);
         },
         navigate: (route: string): boolean => {
             location.hash = `#!${route}`;
             return true;
         },
         hashChange(event: HashChangeEvent): string | null {
             const routeWithPrefix = event.newURL.replace(location.origin + location.pathname, '');
 
             const routingParams = routeWithPrefix.split('#!').filter(Boolean);
             let route = null;
             if(routingParams.length === 0){
                 route = routingParams.shift();
             } else {
                 route = routingParams.pop();
             }
 
             const defaultRoute = null;
         
              // if same has current, no.
             if(event.oldURL === event.newURL){
                 return null;
             }
         
             // If loaded component has routing, let him decide
             // const current = customElements.get('ui-' + route) as typeof Page;
             // if(current && current.hasRouting === true){
             //    return route;
             // }
         
             // if index asked, go to default or if nothing asked, go to default
             if(event.newURL === location.origin + location.pathname || !route){
                 return defaultRoute;
             }
         
             return route;
          }
    };
}

/**
* Convert a remote url to an image data-url
* 
* @param src remote url
*/
export function toDataURL(src: string): Promise<string> {
   return new Promise((resolve, reject) => {
       const image = new Image();
       image.crossOrigin = 'Anonymous';
       image.src = src;

       setTimeout(() => {
           if(image.complete === false){
               // abort image loading if exceeds 500ms : https://stackoverflow.com/questions/5278304/how-to-cancel-an-image-from-loading
               console.warn('Elara ::: Image loading was too slow, rejecting');
               image.src = '';
               reject();
           }
       }, 1200);
       
       image.onload = () => {
           const canvas = document.createElement('canvas');
           const context = canvas.getContext('2d');
           canvas.height = image.naturalHeight;
           canvas.width = image.naturalWidth;
           context.drawImage(image, 0, 0);
           resolve(canvas.toDataURL('image/jpeg'));
       };

       image.onerror = () => {
           reject();
       };
   });
}