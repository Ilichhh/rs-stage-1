import Page from '../../templates/page';
import { TextObject } from '../../types/types';

class GaragePage extends Page {
  static TextObject: TextObject = {
    MainTitle: 'Garage',
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

    return this.main;
  }
}

export default GaragePage;
