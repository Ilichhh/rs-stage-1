import './sources.css';
import type { Source } from './../../../types/types';

class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = <HTMLElement>sourceItemTemp.content.cloneNode(true);
            const itemElement = <HTMLSelectElement>sourceClone.querySelector('.source__item');

            itemElement.textContent = item.name;
            itemElement.value = item.id;

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
