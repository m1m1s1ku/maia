import { LitElement } from 'lit';

export interface PageHelmet {
    title: string | null;
    description: string | null;
    type: string | null;
    image: string | null;
    slug: string | null;
}
export default class Page extends LitElement {
    public get head(): PageHelmet {
        return {
            title: null,
            description: null,
            type: null,
            image: null,
            slug: null
        };
    }

    createRenderRoot(): this { return this; }
}