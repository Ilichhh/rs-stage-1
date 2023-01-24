import Component from '../../templates/component';
import { PageIds } from '../../types/types';

class Header extends Component {
  public constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons(): void {
    const container = document.createElement('div');
    container.className = 'container container_header';
    this.container.append(container);

    const header = document.createElement('h1');
    header.className = 'header__logo';
    header.innerText = 'Async Race';
    container.append(header);

    const pageButtos = document.createElement('nav');
    pageButtos.className = 'header__nav';

    const garageButton = document.createElement('a');
    garageButton.className = 'button';
    garageButton.href = `#${PageIds.GaragePage}`;
    garageButton.innerText = 'Garage';

    const winnersButton = document.createElement('a');
    winnersButton.className = 'button';
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
