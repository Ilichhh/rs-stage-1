import './sources.css';
import type { Source } from './../../../types/types';

class Sources {
    public draw(data: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone: HTMLElement = <HTMLElement>sourceItemTemp.content.cloneNode(true);
            const itemElement: HTMLSelectElement = <HTMLSelectElement>sourceClone.querySelector('.source__item');

            itemElement.textContent = item.name;
            itemElement.value = item.id;

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
