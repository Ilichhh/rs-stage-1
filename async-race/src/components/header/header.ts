import Component from '../../templates/component';
import { PageIds } from '../../types/types';

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons(): void {
    const container = document.createElement('div');
    container.className = 'container';
    this.container.append(container);

    const pageButtos = document.createElement('nav');

    const garageButton = document.createElement('a');
    garageButton.href = `#${PageIds.GaragePage}`;
    garageButton.innerText = 'Garage';

    const winnersButton = document.createElement('a');
    winnersButton.href = `#${PageIds.WinnersPage}`;
    winnersButton.innerText = 'Winners';

    pageButtos.append(garageButton);
    pageButtos.append(winnersButton);
    container.append(pageButtos);
  }

  render(): HTMLElement {
    this.renderPageButtons();
    return this.container;
  }
}

export default Header;
