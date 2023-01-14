class Page {
  protected main: HTMLElement;

  static TextObject = {};

  constructor(id: string) {
    this.main = document.createElement('main');
    this.main.id = id;
  }

  protected createHeaderTitle(text: string): HTMLHeadingElement {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  render(): HTMLElement {
    return this.main;
  }
}

export default Page;
