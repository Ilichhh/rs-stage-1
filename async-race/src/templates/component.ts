import DomElement from './domElement';

class Component extends DomElement {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    super();
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default Component;
