import Page from '../../templates/page';
import CarController from '../../components/car-controller/carController';
import { TextObject, AttributesObject } from '../../types/types';

class GaragePage extends Page {
  static TextObject: TextObject = {
    MainTitle: 'Garage',
  };

  static AttributesObject: AttributesObject = {
    createCarInput: {
      type: 'text',
      id: 'create-name',
      name: 'car-name',
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
    },
    updateCarColor: {
      type: 'color',
      id: 'update-color',
      name: 'car-color',
    },
  };

  constructor(id: string) {
    super(id);
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

    const raceButton = this.createElement('button', 'control-panel__race-btn button');
    raceButton.innerText = 'RACE';
    section.append(raceButton);

    const resetButton = this.createElement('button', 'control-panel__reset-btn button');
    resetButton.innerText = 'RESET';
    section.append(resetButton);

    const generateCarsButton = this.createElement('button', 'control-panel__generate-cars-btn button');
    generateCarsButton.innerText = 'GENERATE CARS';
    section.append(generateCarsButton);

    return section;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'container';
    this.main.append(container);

    const title = this.createHeaderTitle(GaragePage.TextObject.MainTitle);
    container.append(title);

    // Car management
    const managementSection = this.createManagementSection();
    container.append(managementSection);

    // Control panel
    const controlSection = this.createControlPanel();
    container.append(controlSection);

    // Race
    const raceContainer = this.createElement('div', 'race-container');
    container.append(raceContainer);

    const carController = new CarController('div', 'car-controller', 'ccc', 'Audi');
    raceContainer.append(carController.render());

    return this.main;
  }
}

export default GaragePage;
