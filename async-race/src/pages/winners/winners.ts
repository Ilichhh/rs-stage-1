import Page from '../../templates/page';
import { TextObject } from '../../types/types';

class WinnersPage extends Page {
  static TextObject: TextObject = {
    MainTitle: 'Winners',
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    this.main.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'container';
    this.main.append(container);

    const title = this.createHeaderTitle(WinnersPage.TextObject.MainTitle);
    container.append(title);

    return this.main;
  }
}

export default WinnersPage;
