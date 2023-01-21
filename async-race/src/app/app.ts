/* eslint-disable no-param-reassign */
import GaragePage from '../pages/garage/garage';
import WinnersPage from '../pages/winners/winners';
import Header from '../components/header/header';
import Page404 from '../pages/404/404';
import Api from '../api/api';
import RandomCarGenerator from '../utils/randomCarGenerator';
// eslint-disable-next-line object-curly-newline
import { PageIds, ErrorTypes, Cars, CarEngine } from '../types/types';

const RANDOM_CARS_COUNT = 10;
const ITEMS_PER_PAGE = 7;

class App {
  private static body: HTMLElement = document.body;

  private static defaultPageId: string = 'main';

  private header: Header;

  private api: Api;

  private garage: GaragePage;

  private carId: number;

  private renderNewPage(idPage: string, cars: Cars): void {
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
      const pageHTML = page.render(cars, this.garage.currentPage, ITEMS_PER_PAGE);
      pageHTML.id = App.defaultPageId;
      App.body.append(pageHTML);
    }
  }

  private enableRouteChange(): void {
    window.addEventListener('hashchange', async () => {
      const hash: string = window.location.hash.slice(1);
      const cars: Cars = await this.api.getCars(this.garage.currentPage, ITEMS_PER_PAGE);
      this.renderNewPage(hash, cars);
    });
  }

  private async renderStartPage(): Promise<void> {
    const hash: string = window.location.hash.slice(1);
    const cars: Cars = await this.api.getCars(this.garage.currentPage, ITEMS_PER_PAGE);
    this.renderNewPage(hash, cars);
  }

  private async generateRandomCars(): Promise<void> {
    const carsPromises: Promise<void>[] = [];
    for (let i = 0; i < RANDOM_CARS_COUNT; i += 1) {
      const name: string = RandomCarGenerator.generateName();
      const color: string = RandomCarGenerator.generateColor();
      carsPromises.push(this.api.createCar(name, color));
    }
    await Promise.all(carsPromises);
    this.redrawRaceSection();
  }

  private async createCar(e: Event): Promise<void> {
    e.preventDefault();
    if (!this.garage.createCarName.value.length) {
      const warning = setInterval(() => {
        this.garage.createCarName.classList.toggle('management__create-input_warning');
      }, 200);
      setTimeout(() => clearInterval(warning), 1600);
    } else {
      await this.api.createCar(this.garage.createCarName.value, this.garage.creteCarColor.value);
      this.garage.createCarName.value = '';
      this.redrawRaceSection();
    }
  }

  private async updateCar(e: Event): Promise<void> {
    e.preventDefault();
    if (!this.garage.updateCarName.value.length) {
      const warning = setInterval(() => {
        this.garage.updateCarName.classList.toggle('management__update-input_warning');
      }, 200);
      setTimeout(() => clearInterval(warning), 1600);
    } else {
      // eslint-disable-next-line max-len
      await this.api.updateCar(this.carId, this.garage.updateCarName.value, this.garage.updateCarColor.value);
      this.garage.updateCarName.value = '';
      this.renderStartPage();
    }
  }

  private async redrawRaceSection() {
    const cars: Cars = await this.api.getCars(this.garage.currentPage, ITEMS_PER_PAGE);
    this.garage.renderRaceSection(cars, this.garage.currentPage, ITEMS_PER_PAGE);
  }

  constructor() {
    this.header = new Header('header', 'header');
    this.api = new Api('http://localhost:3000');
    this.garage = new GaragePage('garage');
    this.carId = 0;
  }

  async start() {
    App.body.append(this.header.render());

    this.renderStartPage();
    this.enableRouteChange();

    this.garage.generateCarsBtn.addEventListener('click', () => this.generateRandomCars());
    this.garage.createCarForm.addEventListener('submit', (e) => this.createCar(e));
    this.garage.updateCarForm.addEventListener('submit', (e) => this.updateCar(e));

    this.garage.nextPageBtn.addEventListener('click', () => {
      this.garage.currentPage += 1;
      this.redrawRaceSection();
    });

    this.garage.prevPageBtn.addEventListener('click', () => {
      this.garage.currentPage -= 1;
      this.redrawRaceSection();
    });

    this.garage.raceButton.addEventListener('click', async () => {
      this.garage.raceButton.disabled = true;
      this.garage.resetButton.disabled = false;
      const carsPromises: Promise<void>[] = [];
      const cars: HTMLButtonElement[] = <HTMLButtonElement[]>[
        ...document.querySelectorAll('.car-controller__start-btn'),
      ];
      cars.forEach((car) => {
        carsPromises.push(this.driveCar(car));
      });
      await Promise.all(carsPromises);
    });

    this.garage.main.addEventListener('click', async (e) => {
      const target: HTMLElement = <HTMLElement>e.target;
      if (target.classList.contains('car-controller__delete-btn')) {
        // Delete
        const id: string = <string>target.closest('.car-controller')?.id;
        await this.api.deleteCar(+id);
        let cars: Cars = await this.api.getCars(this.garage.currentPage, ITEMS_PER_PAGE);
        cars.items = cars.items.filter((car) => car.id !== +id);
        if (cars.items.length === 0 && this.garage.currentPage !== 1) {
          this.garage.currentPage -= 1;
          cars = await this.api.getCars(this.garage.currentPage, ITEMS_PER_PAGE);
        }
        this.garage.renderRaceSection(cars, this.garage.currentPage, ITEMS_PER_PAGE);
      } else if (target.classList.contains('car-controller__edit-btn')) {
        // Edit
        const id: string = <string>target.closest('.car-controller')?.id;
        this.carId = +id;
        this.garage.updateCarName.disabled = false;
        this.garage.createCarName.disabled = true;
        const car = await this.api.getCar(+id);
        this.garage.updateCarName.placeholder = 'enter name';
        this.garage.createCarName.placeholder = '';
        this.garage.updateCarName.value = car.name;
        this.garage.updateCarColor.value = car.color;
        this.garage.updateCarButton.disabled = false;
        this.garage.createCarButton.disabled = true;
      } else if (target.classList.contains('car-controller__start-btn')) {
        // Start
        await this.driveCar(<HTMLButtonElement>target);
      } else if (target.classList.contains('car-controller__stop-btn')) {
        // Stop
        const id: string = <string>target.closest('.car-controller')?.id;
        await this.api.engineStop(+id);
      }
    });
  }

  private async driveCar(target: HTMLButtonElement) {
    const trackElement: HTMLElement = <HTMLElement>target.parentNode?.parentNode;
    const car: HTMLElement = <HTMLElement>trackElement.children[1];
    const stopBtn: HTMLButtonElement = <HTMLButtonElement>target.parentNode?.children[1];
    const trackLength: number = trackElement.clientWidth - 200;
    const id: string = <string>target.closest('.car-controller')?.id;
    const engine: CarEngine = await this.api.engineStart(+id);
    const time: number = Math.round(engine.distance / engine.velocity);

    target.disabled = true;
    stopBtn.disabled = false;
    let carAnimation;

    let position: number = 0;
    const framesCount: number = (time / 1000) * 60;
    const shift: number = trackLength / framesCount;

    function step() {
      position += shift;
      car.style.transform = `translateX(${position}px)`;
      if (position < trackLength && engine.velocity) carAnimation = requestAnimationFrame(step);
    }
    step();

    stopBtn.addEventListener('click', async () => {
      await this.api.engineStop(+id);
      position = 0;
      car.style.transform = 'translateX(0px)';
      engine.velocity = 0;
      target.disabled = false;
      stopBtn.disabled = true;
    });

    const res = await this.api.drive(+id);
    if (res.success && engine.velocity) {
      console.log(time);
    }
    if (!res.success) {
      engine.velocity = 0;
      carAnimation = requestAnimationFrame(step);
      cancelAnimationFrame(carAnimation);
    }
  }
}

export default App;
