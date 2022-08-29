import { Chart, Util } from '@antv/g2';

const kPastelColors = ['#A7CBD0', '#C5A2C5', '#ECE4D9', '#DBBAC1', '#BDCCAC', '#CFDBDB', '#E6E0CE', '#D5CFC0', '#EFEFEF', '#D2E6D4', '#FFB3BA', '#FFDFBA'];

export function renderRepartitionChart(container: HTMLElement, data: {
    chart: {
        id:string
        name: {en: string, fr: string}
        percent:number;
        price: number
    }[];
}) {
    container.innerHTML = '';
    const parsed = data.chart.map(item => ({
        id: item.id,
        name: item.name.en,
        percent: item.percent,
        price: item.price,
    }));
    const chart = new Chart({
        container,
        autoFit: true,
        height: 500,
    });
    chart.data(parsed);
    
    chart.coordinate('theta', {
        radius: 0.75
    });
    chart.tooltip({
        showMarkers: false
    });
    
    chart
    .interval()
    .adjust('stack')
    .position('percent')
    .color('name', kPastelColors)
    .style({ opacity: 0.4 })
    .state({
        active: {
        style: (element) => {
            const shape = element.shape;
            return {
                matrix: Util.zoom(shape, 1.1),
            };
        }
        }
    });
    /*.label('name', (_val) => {
        return {
            offset: -30,
            style: {
                opacity: 1,
                fill: 'white',
                fontSize: 12,
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)',
            },
            content: (obj) => {
                return obj.name + '\n' + obj.percent + '%';
            },
        };
    });*/
      
    chart.interaction('element-single-selected');
    chart.render();

    return chart;
}

export function renderBreakdown(container: HTMLElement, data:{
    chart: {
        id:string
        name: {en: string, fr: string}
        percent:number;
        price: number
    }[];
}) {
    container.innerHTML = '';
    const parsed = data.chart.map(property => {
        return {
            class: 'immo',
            name: property.name.en.replace('Immeuble', ''),
            value: property.price * 0.01,
            percent: property.percent,
        };
    });
      
    const chart = new Chart({
        container,
        autoFit: true,
        height: 500,
        padding: [20, 20, 20, 70]
    });
    
    chart.data(parsed);
    chart.legend(false);
    chart.tooltip({
        showMarkers: false
    });
    chart.facet('rect', {
        fields: [],

        eachView: (view, facet) => {
            view.coordinate().transpose();
        
            if (facet && facet.columnIndex === 0) {
                view.axis('name', {
                    tickLine: null,
                    line: null,
                });
                view.axis('percent', false);
            } else {
                view.axis(false);
            }

            view
            .interval()
            .adjust('stack')
            .position('name*value')
            .color('name', kPastelColors)
            .size(20);
            view.interaction('element-active');
        }
    });
    chart.render();
}