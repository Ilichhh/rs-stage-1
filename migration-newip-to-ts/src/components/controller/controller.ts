import AppLoader from './appLoader';
import type { CallbackFunc } from './../../types/types';

class AppController extends AppLoader {
    public getSources<T>(callback: CallbackFunc<T>): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: CallbackFunc<T>): void {
        let target: HTMLSelectElement = <HTMLSelectElement>e.target;
        const newsContainer: HTMLElement = <HTMLElement>e.currentTarget;

        if (target.classList.contains('sources')) {
            const sourceId: string = <string>target.value;
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
