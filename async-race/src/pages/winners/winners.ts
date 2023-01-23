import Page from '../../templates/page';
import { TextObject, Winner } from '../../types/types';

class WinnersPage extends Page {
  static TextObject: TextObject = {
    MainTitle: 'Winners',
  };

  public currentPage: number;

  constructor(id: string) {
    super(id);
    this.currentPage = 1;
  }

  render(winners: Winner[], page: number, limit: number): HTMLElement {
    console.log(page);
    console.log(limit);
    console.log(winners);
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
