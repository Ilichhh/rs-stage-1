import GaragePage from '../pages/garage/garage';
import WinnersPage from '../pages/winners/winners';
import Header from '../components/header/header';
import Page404 from '../pages/404/404';
import { PageIds, ErrorTypes } from '../types/types';

class App {
  private static element: HTMLElement = document.body;

  private static defaultPageId: string = 'main';

  private garagePage: GaragePage;

  private header: Header;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.getElementById(App.defaultPageId);
    currentPageHTML?.remove();
    let page: GaragePage | null = null;

    if (idPage === PageIds.GaragePage || !idPage) {
      page = new GaragePage(idPage);
    } else if (idPage === PageIds.WinnersPage) {
      page = new WinnersPage(idPage);
    } else {
      page = new Page404(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.element.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash: string = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.garagePage = new GaragePage(PageIds.GaragePage);
    this.header = new Header('header', 'header');
  }

  start() {
    App.element.append(this.header.render());
    App.renderNewPage(PageIds.GaragePage);
    this.enableRouteChange();
  }
}

export default App;
