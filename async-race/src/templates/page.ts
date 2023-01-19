import DomElement from './domElement';
import { Car } from '../types/types';

class Page extends DomElement {
  public main: HTMLElement;

  static TextObject = {};

  constructor(id: string) {
    super();
    this.main = document.createElement('main');
    this.main.id = id;
  }

  protected createHeaderTitle(text: string): HTMLHeadingElement {
    const headerTitle = document.createElement('h2');
    headerTitle.innerText = text;
    return headerTitle;
  }

  render(carsArr: Car[]): HTMLElement {
    return this.main;
  }
}

export default Page;
