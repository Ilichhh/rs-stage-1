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

  public raceButton: HTMLButtonElement;

  public resetButton: HTMLButtonElement;

  public generateCarsBtn: HTMLButtonElement;

  constructor(id: string) {
    super(id);
    this.raceButton = <HTMLButtonElement>this.createElement('button', 'control-panel__race-btn button');
    this.raceButton.innerText = 'RACE';
    this.resetButton = <HTMLButtonElement>this.createElement('button', 'control-panel__reset-btn button');
    this.resetButton.innerText = 'RESET';
    this.generateCarsBtn = <HTMLButtonElement>this.createElement('button', 'control-panel__generate-cars-btn button');
    this.generateCarsBtn.innerText = 'GENERATE CARS';
  }

  private createManagementSection(): HTMLElement {
    const section = this.createElement('div', 'management');

    const createCarBlock = this.createElement('form', 'management__create-form');
    section.append(createCarBlock);

    const creteCarInput = this.createElement('input', 'management__create-input');
    this.setMultipleAttributes(creteCarInput, GaragePage.AttributesObject.createCarInput);
    createCarBlock.append(creteCarInput);

    const creteCarColor = this.createElement('input', 'management__create-color');
    this.setMultipleAttributes(creteCarColor, GaragePage.AttributesObject.createCarColor);
    createCarBlock.append(creteCarColor);

    const createCarButton = this.createElement('button', 'management__create-btn button');
    createCarButton.setAttribute('type', 'submit');
    createCarButton.innerText = 'CREATE';
    createCarBlock.append(createCarButton);

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
    this.resetButton.disabled = true;
    section.append(this.raceButton);
    section.append(this.resetButton);
    section.append(this.generateCarsBtn);

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

    // Race
    const title = this.createHeaderTitle(`Garage (${carsArr.length})`);
    container.append(title);
    const raceContainer = this.createElement('div', 'race-container');
    container.append(raceContainer);

    carsArr.forEach((car) => {
      const carController = new CarController('div', 'car-controller', car.color, car.name);
      raceContainer.append(carController.render());
    });

    return this.main;
  }
}

export default GaragePage;
