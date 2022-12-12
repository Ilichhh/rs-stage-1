import News from './news/news';
import Sources from './sources/sources';
import ghLogo from './../../assets/gh.png';
import rsLogo from './../../assets/rs.png';
import type { ArticlesDate, SourceDate } from './../../types/types';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ArticlesDate) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourceDate) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    drawFooter() {
        const ghLogoElement = <HTMLImageElement>document.querySelector('.social__gh-logo');
        const rsLogoElement = <HTMLImageElement>document.querySelector('.social__rs-logo');
        ghLogoElement.src = ghLogo;
        rsLogoElement.src = rsLogo;
    }
}

export default AppView;
