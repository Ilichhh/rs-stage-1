import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import type { SourceDate, ArticlesDate } from './../../types/types';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        this.view.drawFooter();
        document
            .querySelector('.sources')
            ?.addEventListener('change', (e) =>
                this.controller.getNews(e, (data: ArticlesDate) => this.view.drawNews(data))
            );
        this.controller.getSources((data: SourceDate) => this.view.drawSources(data));
    }
}

export default App;
