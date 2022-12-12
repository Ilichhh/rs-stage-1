import AppLoader from './appLoader';
import type { CallbackFunc } from './../../types/types';

class AppController extends AppLoader {
    getSources<T>(callback: CallbackFunc<T>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews<T>(e: Event, callback: CallbackFunc<T>) {
        let target = <HTMLSelectElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;

        if (target.classList.contains('sources')) {
            const sourceId = <string>target.value;
            if (newsContainer.getAttribute('data-source') !== sourceId) {
                newsContainer.setAttribute('data-source', sourceId);
                super.getResp(
                    {
                        endpoint: 'everything',
                        options: {
                            sources: sourceId,
                        },
                    },
                    callback
                );
            }
        }
        target = <HTMLSelectElement>target.parentNode;
    }
}

export default AppController;
