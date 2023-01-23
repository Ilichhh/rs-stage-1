/* eslint-disable no-param-reassign */
import GaragePage from '../pages/garage/garage';
import WinnersPage from '../pages/winners/winners';
import Header from '../components/header/header';
import Page404 from '../pages/404/404';
import Api from '../api/api';
import RandomCarGenerator from '../utils/randomCarGenerator';
// eslint-disable-next-line object-curly-newline
import { PageIds, ErrorTypes, Cars, Car, CarEngine, RaceResult, WinnersUpdated } from '../types/types';

const RANDOM_CARS_COUNT = 10;
const CARS_PER_PAGE = 7;
const WINNERS_PER_PAGE = 10;

class App {
  private static body: HTMLElement = document.body;

  private static defaultPageId: string = 'main';

  private header: Header;

  private api: Api;

  private garage: GaragePage;

  private winners: WinnersPage;

  private carId: number;

  private renderNewPage(idPage: string, cars: Cars, winners: WinnersUpdated): void {
    const currentPageHTML = document.getElementById(App.defaultPageId);
    currentPageHTML?.remove();
    let page;
    let pageHTML: HTMLElement;

    if (idPage === PageIds.GaragePage || !idPage) {
      page = this.garage;
      pageHTML = page.render(cars, this.garage.currentPage, CARS_PER_PAGE);
    } else if (idPage === PageIds.WinnersPage) {
      page = this.winners;
      pageHTML = page.render(winners, this.garage.currentPage, WINNERS_PER_PAGE);
    } else {
      page = new Page404(idPage, ErrorTypes.Error_404);
      pageHTML = page.render();
    }

    if (page) {
      pageHTML.id = App.defaultPageId;
      App.body.append(pageHTML);
    }
  }

  private async getFullWinnersData() {
    const winners = await this.api.getWinners(this.winners.currentPage, WINNERS_PER_PAGE);
    const updatedWinners: WinnersUpdated = { items: [], count: winners.count };
    const promises: Promise<Car>[] = [];

    winners.items.forEach((winner) => {
      promises.push(this.api.getCar(winner.id));
    });
    const winnersAddData = await Promise.all(promises);

    winners.items.forEach((winner, index) => {
      updatedWinners.items.push({
        id: winner.id,
        wins: winner.wins,
        time: winner.time,
        name: winnersAddData[index].name,
        color: winnersAddData[index].color,
      });
    });
    return updatedWinners;
  }

  private enableRouteChange(): void {
    window.addEventListener('hashchange', async () => {
      const hash: string = window.location.hash.slice(1);
      const cars: Cars = await this.api.getCars(this.garage.currentPage, CARS_PER_PAGE);
      const winners: WinnersUpdated = await this.getFullWinnersData();
      this.renderNewPage(hash, cars, winners);
    });
  }

  private async renderStartPage(): Promise<void> {
    const hash: string = window.location.hash.slice(1);
    const cars: Cars = await this.api.getCars(this.garage.currentPage, CARS_PER_PAGE);
    const winners: WinnersUpdated = await this.getFullWinnersData();
    this.renderNewPage(hash, cars, winners);
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
    const cars: Cars = await this.api.getCars(this.garage.currentPage, CARS_PER_PAGE);
    this.garage.renderRaceSection(cars, this.garage.currentPage, CARS_PER_PAGE);
  }

  private async redrawWinnersSection() {
    const winners = await this.getFullWinnersData();
    this.winners.render(winners, this.winners.currentPage, WINNERS_PER_PAGE);
  }

  constructor() {
    this.header = new Header('header', 'header');
    this.api = new Api('http://localhost:3000');
    this.garage = new GaragePage('garage');
    this.winners = new WinnersPage('winners');
    this.carId = 0;
  }

  async start() {
    App.body.append(this.header.render());

    this.renderStartPage();
    this.enableRouteChange();

    this.winners.nextPageBtn.addEventListener('click', () => {
      this.winners.currentPage += 1;
      this.redrawWinnersSection();
    });

    this.winners.prevPageBtn.addEventListener('click', () => {
      this.winners.currentPage -= 1;
      this.redrawWinnersSection();
    });

    this.winners.sortByTimeBtn.addEventListener('click', () => {
      if (this.winners.sortingFilter === 'time-desc') this.winners.sortingFilter = 'time-asc';
      else this.winners.sortingFilter = 'time-desc';
      this.redrawWinnersSection();
    });

    this.winners.sortByWinsBtn.addEventListener('click', () => {
      if (this.winners.sortingFilter === 'wins-desc') this.winners.sortingFilter = 'wins-asc';
      else this.winners.sortingFilter = 'wins-desc';
      this.redrawWinnersSection();
    });

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
      const carsPromises: Promise<RaceResult>[] = [];
      const cars: HTMLButtonElement[] = <HTMLButtonElement[]>[
        ...document.querySelectorAll('.car-controller__start-btn'),
      ];
      cars.forEach((car) => {
        carsPromises.push(this.driveCar(car));
      });
      const receResult: RaceResult[] = await Promise.all(carsPromises);
      const bestRes = receResult.filter((car) => car.finished).sort((a, b) => a.time - b.time)[0];
      const winner = { id: bestRes.id, wins: 1, time: bestRes.time / 1000 };
      const winnersData = await this.api.getWinners();
      if (winnersData.items.map((w) => w.id).includes(winner.id)) {
        const pastWinnersData = winnersData.items.filter((wi) => wi.id === winner.id)[0];
        const newWinsNumber = pastWinnersData.wins + 1;
        if (pastWinnersData.time < winner.time) winner.time = pastWinnersData.time;
        winner.wins = newWinsNumber;
        await this.api.updateWinner(winner);
      } else {
        await this.api.createWinner(winner);
      }
      console.log(await this.api.getWinners());
      this.garage.resetButton.disabled = false;
    });

    this.garage.resetButton.addEventListener('click', async () => {
      const carsPromises: Promise<CarEngine>[] = [];
      const cars: HTMLElement[] = <HTMLElement[]>[...document.querySelectorAll('.car-controller')];
      cars.forEach((car) => {
        const id: string = <string>car.id;
        carsPromises.push(this.api.engineStop(+id));
      });
      await Promise.all(carsPromises);
      this.redrawRaceSection();
      this.garage.raceButton.disabled = false;
      this.garage.resetButton.disabled = true;
    });

    this.garage.main.addEventListener('click', async (e) => {
      const target: HTMLElement = <HTMLElement>e.target;
      if (target.classList.contains('car-controller__delete-btn')) {
        // Delete
        const id: string = <string>target.closest('.car-controller')?.id;
        await this.api.deleteCar(+id);
        await this.api.deleteWinner(+id);
        let cars: Cars = await this.api.getCars(this.garage.currentPage, CARS_PER_PAGE);
        cars.items = cars.items.filter((car) => car.id !== +id);
        if (cars.items.length === 0 && this.garage.currentPage !== 1) {
          this.garage.currentPage -= 1;
          cars = await this.api.getCars(this.garage.currentPage, CARS_PER_PAGE);
        }
        this.garage.renderRaceSection(cars, this.garage.currentPage, CARS_PER_PAGE);
      } else if (target.classList.contains('car-controller__edit-btn')) {
        // Edit
        const id: string = <string>target.closest('.car-controller')?.id;
        this.carId = +id;
        const car = await this.api.getCar(+id);
        this.garage.updateCarName.disabled = false;
        this.garage.createCarName.disabled = true;
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
    const carName = trackElement.parentNode?.children[0].children[2].textContent;

    target.disabled = true;
    stopBtn.disabled = false;

    let position: number = 0;
    const framesCount: number = (time / 1000) * 60;
    const shift: number = trackLength / framesCount;

    function step() {
      position += shift;
      car.style.transform = `translateX(${position}px)`;
      if (position < trackLength && engine.velocity) requestAnimationFrame(step);
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
      if (!this.garage.winnerMessage.innerText.length) {
        const convertedTime = time / 1000;
        this.garage.winnerMessage.innerText = `${carName} won with a result of ${convertedTime}s`;
        setTimeout(() => {
          this.garage.winnerMessage.innerText = '';
        }, 10000);
      }
    }
    if (!res.success) {
      engine.velocity = 0;
    }

    return { id: +id, time, finished: res.success };
  }
}

export default App;
