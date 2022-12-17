import './news.css';
import type { Article } from './../../../types/types';
import newsPlaceholder from './../../../assets/news_placeholder.png';

class News {
    public draw(data: Article[]): void {
        const news: Article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone: HTMLElement = <HTMLElement>newsItemTemp.content.cloneNode(true);

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const newsPhoto: HTMLElement = <HTMLElement>newsClone.querySelector('.news__meta-photo');
            newsPhoto.style.backgroundImage = `url(${item.urlToImage || newsPlaceholder})`;
            const newsAuthor: HTMLElement = <HTMLElement>newsClone.querySelector('.news__meta-author');
            newsAuthor.textContent = item.author || item.source.name;
            const newsDate: HTMLElement = <HTMLElement>newsClone.querySelector('.news__meta-date');
            newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsDescrTitle: HTMLElement = <HTMLElement>newsClone.querySelector('.news__description-title');
            newsDescrTitle.textContent = item.title;
            const newsDescrSource: HTMLElement = <HTMLElement>newsClone.querySelector('.news__description-source');
            newsDescrSource.textContent = item.source.name;
            const newsDescrContent: HTMLElement = <HTMLElement>newsClone.querySelector('.news__description-content');
            newsDescrContent.textContent = item.description;
            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsItem: HTMLElement = <HTMLElement>document.querySelector('.news');
        newsItem.innerHTML = '';
        newsItem.appendChild(fragment);
    }
}

export default News;
