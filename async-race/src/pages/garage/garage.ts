import Page from '../../templates/page';
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

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'container';
    this.main.append(container);

    const title = this.createHeaderTitle(GaragePage.TextObject.MainTitle);
    container.append(title);

    // Car management
    const managementSection = this.createElement('div', 'management');
    container.append(managementSection);

    const createCarBlock = this.createElement('form', 'management__create-form');
    managementSection.append(createCarBlock);

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
    managementSection.append(updateCarBlock);

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

    return this.main;
  }
}

export default GaragePage;
