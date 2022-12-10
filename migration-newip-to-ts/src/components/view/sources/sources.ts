import './sources.css';
import type { Source } from './../../../types/types';

class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = <HTMLElement>sourceItemTemp.content.cloneNode(true);
            const itemName = <HTMLElement>sourceClone.querySelector('.source__item-name');
            const itemId = <HTMLElement>sourceClone.querySelector('.source__item');

            itemName.textContent = item.name;
            itemId.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
