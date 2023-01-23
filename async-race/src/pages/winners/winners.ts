/* eslint-disable @typescript-eslint/keyword-spacing */
import Page from '../../templates/page';
import { TextObject, WinnersUpdated } from '../../types/types';

class WinnersPage extends Page {
  static TextObject: TextObject = {
    MainTitle: 'Winners',
  };

  public currentPage: number;

  public prevPageBtn: HTMLButtonElement;

  public nextPageBtn: HTMLButtonElement;

  constructor(id: string) {
    super(id);
    this.currentPage = 1;
    this.prevPageBtn = <HTMLButtonElement>this.createElement('button', 'pages-controls__prev-btn button');
    this.nextPageBtn = <HTMLButtonElement>this.createElement('button', 'pages-controls__next-btn button');
  }

  render(winners: WinnersUpdated, page: number, limit: number): HTMLElement {
    console.log(page);
    console.log(limit);
    console.log(winners.count, 'total');
    console.log(winners);
    this.main.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'container';
    this.main.append(container);

    const title = this.createHeaderTitle(WinnersPage.TextObject.MainTitle);
    container.append(title);

    // Table
    const tableWrapper = this.createElement('div', 'table-wrapper');
    container.append(tableWrapper);
    const winnersTable = this.createElement('table', 'winners');
    tableWrapper.append(winnersTable);

    // Header
    const winnersHeader = this.createElement('tr', 'winners__header');
    const headerNumber = this.createElement('td', 'winners__header-number');
    headerNumber.textContent = '№';
    winnersHeader.append(headerNumber);
    const headerCarImg = this.createElement('td', 'winners__header-car-img');
    headerCarImg.textContent = 'Car';
    winnersHeader.append(headerCarImg);
    const headerName = this.createElement('td', 'winners__header-name');
    headerName.textContent = 'Name';
    winnersHeader.append(headerName);
    const headerWins = this.createElement('td', 'winners__header-wins');
    headerWins.textContent = 'Wins';
    winnersHeader.append(headerWins);
    const headerTime = this.createElement('td', 'winners__header-best-time');
    headerTime.textContent = 'Time';
    winnersHeader.append(headerTime);
    winnersTable.append(winnersHeader);

    // Body
    const winnersBody = this.createElement('tbody', 'winners__body');
    winnersTable.append(winnersBody);

    winners.items.forEach((winner, index) => {
      const row = this.createElement('tr', 'winners__data');
      winnersBody.append(row);

      const number = this.createElement('td', 'winners__number');
      number.textContent = (index + 1).toString();

      const carImage = this.createElement('td', 'winners__car-img');
      carImage.innerHTML = `
        <?xml version="1.0" encoding="UTF-8" standalone="no"?>
        <svg id="svg2" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="60" width="105" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" viewBox="0 0 494.51492 279.4622">
          <g id="layer1" transform="translate(2133.9 381.76)">
            <g id="g4142">
              <path id="path1310" d="m-1918.8-360.12 107.34-0.16138 0.2152 21.371 21.317 0.16125-0.026 42.796-128.76 0.08-0.08-64.247zm-193.63-0.1345 171.83 0.0275 0.08 64.247-171.77 0.1075-0.1344-64.382z" fill="#0ff"/>
              <path id="path1312" d="m-1811.5-360.28 21.532 0.0538v21.478l-21.317-0.16125-0.2152-21.371zm-300.91-21.478 300.94 0.0275-0.026 21.452-107.34 0.16138 0.08 64.247 128.76-0.08 0.026-42.796 21.505 0.0263 0.1075 42.876 107.37 0.1075 0.242 21.371 21.317 0.215-0.026 85.833h-42.876l-0.2151-21.263-21.156-0.37638-0.3764-21.236-85.645 0.0538-0.3764 21.183-21.183 0.37638-0.1614 21.263-150.46-0.0262-0.215-21.236-21.156-0.37637-0.3763-21.236-85.645 0.0538-0.3763 21.183-21.183 0.37637-0.1612 21.263-42.93-0.0262 0.08-171.91h21.398l0.1344 64.382 171.77-0.1075-0.08-64.247-171.83-0.0275 0.054-21.505z" fill="${winner.color}"/>
              <path id="path1450" d="m-1768.3-188.21 42.93-0.0275 0.028 42.93-42.93 0.0275-0.026-42.93zm-279.57 0 42.93-0.0275 0.026 42.93-42.93 0.0275-0.026-42.93zm258.23-42.93 85.645-0.0538 0.3763 21.236 21.156 0.37637 0.2151 21.263-0.1613 64.489-21.317 0.215-0.2151 21.317-85.806-0.0263-0.215-21.344-21.317-0.215-0.081-64.436 0.1613-21.263 21.183-0.37637 0.3763-21.183m21.398 21.425-0.054 21.505h-21.452l-0.026 42.876 21.505 0.0537v21.452l42.876 0.0275 0.054-21.505h21.452l0.026-42.876-21.505-0.0538v-21.452l-42.876-0.0275zm-300.97-21.425 85.645-0.0538 0.3764 21.236 21.156 0.37637 0.215 21.236-0.1613 64.516-21.317 0.215-0.215 21.317-85.806-0.0263-0.2151-21.344-21.317-0.215-0.081-64.436 0.1613-21.263 21.183-0.37637 0.3764-21.183m21.398 21.425-0.054 21.505h-21.452l-0.026 42.876 21.505 0.0537v21.452l42.876 0.0275 0.054-21.505h21.452l0.027-42.876-21.505-0.0538v-21.452l-42.876-0.0275z"/>
              <path id="path1480" d="m-1768.3-145.28 42.93-0.0275-0.054 21.505-42.876-0.0275v-21.452zm-279.57 0 42.93-0.0275-0.054 21.505-42.876-0.0275v-21.452zm322.47-42.957 21.505 0.0538-0.026 42.876h-21.452l-0.028-42.93zm-64.382 0.0269h21.452l0.026 42.93-21.505-0.0537 0.026-42.876zm-215.19-0.0269 21.505 0.0538-0.027 42.876h-21.452l-0.026-42.93zm-64.382 0.0269h21.452l0.026 42.93-21.505-0.0537 0.026-42.876zm301.08-21.505 42.876 0.0275v21.451l-42.93 0.0275 0.054-21.505zm-279.57 0 42.876 0.0275v21.451l-42.93 0.0275 0.054-21.505z" fill="#c0c0c0"/>
            </g>
          </g>
        </svg>
      `;

      const name = this.createElement('td', 'winners__name');
      name.textContent = winner.name.toString();

      const wins = this.createElement('td', 'winners__wins');
      wins.textContent = winner.wins.toString();

      const time = this.createElement('td', 'winners__time');
      time.textContent = winner.time.toString();

      row.append(number);
      row.append(carImage);
      row.append(name);
      row.append(wins);
      row.append(time);
    });

    const pagesControls = this.createElement('div', 'pages-controls pages-controls_winners');

    this.prevPageBtn.innerText = 'PREV';
    if (page === 1) this.prevPageBtn.disabled = true;
    else this.prevPageBtn.disabled = false;
    pagesControls.append(this.prevPageBtn);

    const currentPageIndex = this.createElement('span', 'pages-controls__current-index');
    currentPageIndex.innerText = page.toString();
    pagesControls.append(currentPageIndex);

    this.nextPageBtn.innerText = 'NEXT';
    const totalPages: number = Math.ceil(<number>winners.count / limit);
    if (page === totalPages || totalPages < 2) this.nextPageBtn.disabled = true;
    else this.nextPageBtn.disabled = false;
    pagesControls.append(this.nextPageBtn);

    tableWrapper.append(pagesControls);

    return this.main;
  }
}

export default WinnersPage;
