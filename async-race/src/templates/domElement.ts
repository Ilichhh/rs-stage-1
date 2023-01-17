import type { Attributes } from '../types/types';

class DomElement {
  protected createElement(tag: string, classList: string) {
    const element = document.createElement(tag);
    element.className = classList;
    return element;
  }

  protected setMultipleAttributes(element: HTMLElement, attributes: Attributes): void {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }
}

export default DomElement;
