/* eslint-disable @typescript-eslint/keyword-spacing */
import Page from '../../templates/page';
import CarController from '../../components/car-controller/carController';
import { AttributesObject, Car } from '../../types/types';

class GaragePage extends Page {
  static AttributesObject: AttributesObject = {
    createCarInput: {
      type: 'text',
      id: 'create-name',
      name: 'car-name',
      placeholder: 'enter name',
    },
    createCarColor: {
      type: 'color',
      id: 'create-color',
      name: 'car-color',
    },
    updateCarInput: {
      type: 'text',
      id: 'update-name',
      name: 'car-name',
      disabled: 'disabled',
    },
    updateCarColor: {
      type: 'color',
      id: 'update-color',
      name: 'car-color',
    },
  };

  public createCarForm: HTMLFormElement;

  public createCarName: HTMLInputElement;

  public creteCarColor: HTMLInputElement;

  public createCarButton: HTMLButtonElement;

  public raceButton: HTMLButtonElement;

  public resetButton: HTMLButtonElement;

  public generateCarsBtn: HTMLButtonElement;

  constructor(id: string) {
    super(id);
    this.createCarForm = <HTMLFormElement>this.createElement('form', 'management__create-form');
    this.createCarName = <HTMLInputElement>this.createElement('input', 'management__create-input');
    this.creteCarColor = <HTMLInputElement>this.createElement('input', 'management__create-color');
    this.createCarButton = <HTMLButtonElement>this.createElement('button', 'management__create-btn button');

    this.raceButton = <HTMLButtonElement>this.createElement('button', 'control-panel__race-btn button');
    this.resetButton = <HTMLButtonElement>this.createElement('button', 'control-panel__reset-btn button');
    this.generateCarsBtn = <HTMLButtonElement>this.createElement('button', 'control-panel__generate-cars-btn button');
  }

  private createManagementSection(): HTMLElement {
    const section = this.createElement('div', 'management');

    section.append(this.createCarForm);

    this.setMultipleAttributes(this.createCarName, GaragePage.AttributesObject.createCarInput);
    this.createCarForm.append(this.createCarName);

    this.setMultipleAttributes(this.creteCarColor, GaragePage.AttributesObject.createCarColor);
    this.createCarForm.append(this.creteCarColor);

    this.createCarButton.setAttribute('type', 'submit');
    this.createCarButton.innerText = 'CREATE';
    this.createCarForm.append(this.createCarButton);

    const updateCarBlock = this.createElement('form', 'management__update-form');
    section.append(updateCarBlock);

    const updateCarInput = this.createElement('input', 'management__update-input');
    this.setMultipleAttributes(updateCarInput, GaragePage.AttributesObject.updateCarInput);
    updateCarBlock.append(updateCarInput);

    const updateCarColor = this.createElement('input', 'management__update-color');
    this.setMultipleAttributes(updateCarColor, GaragePage.AttributesObject.updateCarColor);
    updateCarBlock.append(updateCarColor);

    const updateCarButton = this.createElement('button', 'management__update-btn button');
    updateCarButton.setAttribute('type', 'submit');
    updateCarButton.innerText = 'UPDATE';
    updateCarBlock.append(updateCarButton);

    return section;
  }

  private createControlPanel(): HTMLElement {
    const section = this.createElement('div', 'control-panel');
    this.raceButton.innerText = 'RACE';
    this.resetButton.innerText = 'RESET';
    this.resetButton.disabled = true;
    this.generateCarsBtn.innerText = 'GENERATE CARS';

    section.append(this.raceButton);
    section.append(this.resetButton);
    section.append(this.generateCarsBtn);

    return section;
  }

  private createRaceSection(carsArr: Car[]): HTMLElement {
    const section = this.createElement('div', 'race-container');

    carsArr.forEach((car) => {
      const carController = new CarController('div', 'car-controller', car.color, car.name, car.id);
      section.append(carController.render());
    });

    const pagesControls = this.createElement('div', 'pages-controls');
    const prevPageBtn = this.createElement('button', 'pages-controls__prev-btn button');
    prevPageBtn.innerText = 'PREV';
    pagesControls.append(prevPageBtn);
    const currentPageIndex = this.createElement('span', 'pages-controls__current-index');
    currentPageIndex.innerText = '1';
    pagesControls.append(currentPageIndex);
    const nextPageBtn = this.createElement('button', 'pages-controls__next-btn button');
    nextPageBtn.innerText = 'NEXT';
    pagesControls.append(nextPageBtn);
    section.append(pagesControls);

    return section;
  }

  render(carsArr: Car[]): HTMLElement {
    const container = document.createElement('div');
    container.className = 'container container_main';
    this.main.innerHTML = '';
    this.main.append(container);

    // Car management
    const managementSection = this.createManagementSection();
    container.append(managementSection);

    // Control panel
    const controlSection = this.createControlPanel();
    container.append(controlSection);

    // Header
    const title = this.createHeaderTitle(`Garage (${carsArr.length})`);
    container.append(title);

    // Race section
    const raceContainer = this.createRaceSection(carsArr);
    container.append(raceContainer);

    return this.main;
  }
}

export default GaragePage;
