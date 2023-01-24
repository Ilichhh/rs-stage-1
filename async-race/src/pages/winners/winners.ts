/* eslint-disable @typescript-eslint/keyword-spacing */
import Page from '../../templates/page';
import Footer from '../../components/footer/footer';
import Car from '../../components/car/car';
import { WinnersData, WinnersUpdated } from '../../types/types';

class WinnersPage extends Page {
  public currentPage: number;

  public sortingFilter: string;

  public prevPageBtn: HTMLButtonElement;

  public nextPageBtn: HTMLButtonElement;

  public sortByWinsBtn: HTMLElement;

  public sortByTimeBtn: HTMLElement;

  constructor(id: string) {
    super(id);
    this.currentPage = 1;
    this.sortingFilter = 'time-desc';
    this.prevPageBtn = <HTMLButtonElement>this.createElement('button', 'pages-controls__prev-btn button');
    this.nextPageBtn = <HTMLButtonElement>this.createElement('button', 'pages-controls__next-btn button');

    this.sortByWinsBtn = this.createElement('td', 'winners__header-wins');
    this.sortByTimeBtn = this.createElement('td', 'winners__header-best-time');
  }

  private sortWinners(data: WinnersData[], filter: string) {
    let sortedData;
    if (filter === 'time-desc') sortedData = data.sort((a, b) => a.time - b.time);
    if (filter === 'time-asc') sortedData = data.sort((a, b) => b.time - a.time);
    if (filter === 'wins-desc') sortedData = data.sort((a, b) => a.wins - b.wins);
    if (filter === 'wins-asc') sortedData = data.sort((a, b) => b.wins - a.wins);

    return sortedData || data;
  }

  render(winners: WinnersUpdated, page: number, limit: number): HTMLElement {
    this.main.innerHTML = '';
    const container = document.createElement('div');
    container.className = 'container';
    this.main.append(container);

    const title = this.createHeaderTitle(`Winners (${winners.count})`);
    container.append(title);

    // Table
    const tableWrapper = this.createElement('div', 'table-wrapper');
    container.append(tableWrapper);
    const winnersTable = this.createElement('table', 'winners');
    tableWrapper.append(winnersTable);

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
    this.sortByWinsBtn.textContent = 'Wins';
    winnersHeader.append(this.sortByWinsBtn);
    this.sortByTimeBtn.textContent = 'Time';
    winnersHeader.append(this.sortByTimeBtn);
    winnersTable.append(winnersHeader);

    const winnersBody = this.createElement('tbody', 'winners__body');
    winnersTable.append(winnersBody);

    const sortedData = this.sortWinners(winners.items, this.sortingFilter);
    this.createTableData(sortedData, winnersBody);
    const pagesControls = this.createPageControls(winners, limit);

    tableWrapper.append(pagesControls);
    this.main.append(Footer.render());

    return this.main;
  }

  private createTableData(data: WinnersData[], body: HTMLElement) {
    data.forEach((winner, index) => {
      const row = this.createElement('tr', 'winners__data');
      body.append(row);

      const number = this.createElement('td', 'winners__number');
      number.textContent = (index + 1 + (this.currentPage * 10 - 10)).toString();
      row.append(number);

      const carImage = new Car('td', 'winners__car-img', winner.color).render();
      row.append(carImage);

      const name = this.createElement('td', 'winners__name');
      name.textContent = winner.name.toString();
      row.append(name);

      const wins = this.createElement('td', 'winners__wins');
      wins.textContent = winner.wins.toString();
      row.append(wins);

      const time = this.createElement('td', 'winners__time');
      time.textContent = winner.time.toString();
      row.append(time);
    });
  }

  private createPageControls(winners: WinnersUpdated, limit: number) {
    const block = this.createElement('div', 'pages-controls pages-controls_winners');
    this.prevPageBtn.innerText = 'PREV';
    if (this.currentPage === 1) this.prevPageBtn.disabled = true;
    else this.prevPageBtn.disabled = false;
    block.append(this.prevPageBtn);

    const currentPageIndex = this.createElement('span', 'pages-controls__current-index');
    currentPageIndex.innerText = this.currentPage.toString();
    block.append(currentPageIndex);

    this.nextPageBtn.innerText = 'NEXT';
    const totalPages: number = Math.ceil(<number>winners.count / limit);
    if (this.currentPage === totalPages || totalPages < 2) this.nextPageBtn.disabled = true;
    else this.nextPageBtn.disabled = false;
    block.append(this.nextPageBtn);

    return block;
  }
}

export default WinnersPage;
