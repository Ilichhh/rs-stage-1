class Footer {
  public static render(): HTMLElement {
    const container = document.createElement('footer');
    container.classList.add('footer');
    container.innerHTML = `
      <div class="container container_footer">
        <div class="social">
          <a class="social__link" href="https://rs.school/js/" target="_blank">
            rs-school
          </a>
        </div>
        <div class="social">
          <a class="social__link" href="https://github.com/Ilichhh" target="_blank">
            Ilichhh
          </a>
        </div>
      </div>
    `;
    return container;
  }
}

export default Footer;
