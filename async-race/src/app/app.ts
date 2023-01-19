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

  private carId: number;

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
    this.carId = 0;
  }

  async start() {
    App.body.append(this.header.render());
    let carsArr = await this.api.getCars();

    this.renderStartPage(carsArr);
    this.enableRouteChange(carsArr);

    this.garage.main.addEventListener('click', async (e) => {
      const target: HTMLElement = <HTMLElement>e.target;
      if (target.classList.contains('car-controller__delete-btn')) {
        const id: string = <string>target.closest('.car-controller')?.id;
        carsArr = await this.api.deleteCar(+id, carsArr);
        this.garage.render(carsArr);
      } else if (target.classList.contains('car-controller__edit-btn')) {
        const id: string = <string>target.closest('.car-controller')?.id;
        this.carId = +id;
        this.garage.updateCarName.disabled = false;
        this.garage.createCarName.disabled = true;
        const car = await this.api.getCar(+id);
        this.garage.updateCarName.value = car.name;
        this.garage.updateCarColor.value = car.color;
      }
    });

    this.garage.createCarForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.api.createCar(this.garage.createCarName.value, this.garage.creteCarColor.value);
      carsArr = await this.api.getCars();
      this.garage.createCarName.value = '';
      this.garage.render(carsArr);
    });

    this.garage.updateCarForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      // eslint-disable-next-line max-len
      await this.api.updateCar(this.carId, this.garage.updateCarName.value, this.garage.updateCarColor.value);
      carsArr = await this.api.getCars();
      this.garage.updateCarName.value = '';
      this.garage.render(carsArr);
    });
  }
}

export default App;
