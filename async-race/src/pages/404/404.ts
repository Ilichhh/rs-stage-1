import Page from '../../templates/page';
import { TextObject, ErrorTypes } from '../../types/types';

class Page404 extends Page {
  private errorType: ErrorTypes;

  static TextObject: TextObject = {
    404: 'Error! The page was not found',
  };

  constructor(id: string, errorType: ErrorTypes) {
    super(id);
    this.errorType = errorType;
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'container';
    this.main.append(container);

    const title = this.createHeaderTitle(Page404.TextObject[this.errorType]);
    container.append(title);
    return this.main;
  }
}

export default Page404;
