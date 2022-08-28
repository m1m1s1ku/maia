import { LitElement } from 'lit';

export interface PageHelmet {
    title: string;
    description: string;
    type: string;
    image: string;
    slug: string;
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