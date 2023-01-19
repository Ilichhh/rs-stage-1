import GaragePage from '../pages/garage/garage';
import WinnersPage from '../pages/winners/winners';
import Header from '../components/header/header';
import Page404 from '../pages/404/404';
import Api from '../api/api';
import { PageIds, ErrorTypes, Car } from '../types/types';

class App {
  private static body: HTMLElement = document.body;

  private static defaultPageId: string = 'main';

  private header: Header;

  private api: Api;

  private garage: GaragePage;

  private renderNewPage(idPage: string, carsArr: Car[]): void {
    const currentPageHTML = document.getElementById(App.defaultPageId);
    currentPageHTML?.remove();
    let page: GaragePage | WinnersPage | null = null;

    if (idPage === PageIds.GaragePage || !idPage) {
      page = this.garage;
    } else if (idPage === PageIds.WinnersPage) {
      page = new WinnersPage(idPage);
    } else {
      page = new Page404(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render(carsArr);
      pageHTML.id = App.defaultPageId;
      App.body.append(pageHTML);
    }
  }

  private enableRouteChange(carsArr: Car[]): void {
    window.addEventListener('hashchange', () => {
      const hash: string = window.location.hash.slice(1);
      this.renderNewPage(hash, carsArr);
    });
  }

  private renderStartPage(carsArr: Car[]): void {
    const hash: string = window.location.hash.slice(1);
    this.renderNewPage(hash, carsArr);
  }

  constructor() {
    this.header = new Header('header', 'header');
    this.api = new Api('http://localhost:3000');
    this.garage = new GaragePage('garage');
  }

  async start() {
    App.body.append(this.header.render());
    const carsArr = await this.api.getCars();

    this.renderStartPage(carsArr);
    this.enableRouteChange(carsArr);
  }
}

export default App;
