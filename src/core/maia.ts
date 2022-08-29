import { MaiaApp } from '../maia-app';
import { pulseWith } from './animations';

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
        loadPromises.push(load);
    }
    
    return Promise.all(loadPromises);
}

export async function load(route: string | null, content: HTMLElement): Promise<void> {
    if(!route){
        return;
    }

    const defaultTitle = 'Maia.';
    const componentName = 'ui-' + route;

    const Component = customElements.get(componentName);
    content.classList.remove('full-width');

    const loaded = Component ? new Component() : null;

    document.title = defaultTitle;

    window.scrollTo(0,0);

    const removeChilds = (parent: HTMLElement) => {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
    };

    const handle = window.requestAnimationFrame(() => {
        if(!loaded){
            return;
        }

        removeChilds(content);
        content.appendChild(loaded);
        const pageContent = loaded.querySelector('div');
        if(!pageContent){
            cancelAnimationFrame(handle);
            return;
        }
        const animation = pulseWith(300);			
        pageContent.animate(animation.effect, animation.options);
    });
}

type MaiaRouter = {
    redirect: (url: string, target?: string) => boolean;
    navigate: (route: string) => boolean;
    hashChange(event: HashChangeEvent): string | null;
};

export function Router(): MaiaRouter {
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
               console.warn('Maia ::: Image loading was too slow, rejecting');
               image.src = '';
               reject();
           }
       }, 1200);
       
       image.onload = () => {
           const canvas = document.createElement('canvas');
           const context = canvas.getContext('2d');
           canvas.height = image.naturalHeight;
           canvas.width = image.naturalWidth;
           if(context) {
            context.drawImage(image, 0, 0);
            resolve(canvas.toDataURL('image/jpeg'));
           } else {
            reject(new Error('No context'));
           }
       };

       image.onerror = () => {
           reject();
       };
   });
}