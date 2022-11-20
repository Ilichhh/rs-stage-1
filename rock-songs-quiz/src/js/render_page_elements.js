import createDomElement from './create_element';
import rsLogo from '../assets/svg/rsschooljs.svg';
import logo from '../assets/images/Logo.png';
import ghLogo from '../assets/images/band_placeholder.png';


export function renderHeader(header, main) {
  const container = createDomElement('div', header, 'container container_header');
  const logo = createDomElement('a', container, 'logo');
  createDomElement('img', logo, 'logo', { src: './assets/Logo.png', alt: 'logo', width: 70 });
  const nav = createDomElement('nav', container, 'nav');

  const menu = createDomElement('ul', nav, 'menu');
  const menuItems = ['Quiz', 'Results', 'Gallery'];
  for (let item of menuItems) {
    const li = createDomElement('li', menu, 'menu__item');
    const link = createDomElement('a', li, 'menu__link', { href: '#' }, item);
  }
}


export function renderFooter(footer) {
  const container = createDomElement('div', footer, 'container container_footer');
  container.innerHTML = `
    <div class="social"><a href="https://rs.school/js/" target="_blank" class="rs-logo"></a></div>
    <div class="year">&copy; 2022</div>
    <div class="social"><a href="https://github.com/Ilichhh" target="_blank"><img src="assets/GitHub-Mark-Light-32px.png" alt="github"></a></div>
  `;
  const rsLogoElement = document.querySelector('.rs-logo');
  rsLogoElement.innerHTML = rsLogo;
}


export function renderQuizPage(main) {
  main.innerHTML = '';
  const container = createDomElement('div', main, 'container');
  const wrapper = createDomElement('div', container, 'quiz-wrapper');
  const statusBlock = createDomElement('div', wrapper, 'status-block');

  const stages = createDomElement('ul', statusBlock, 'stages');
  const stagesItems = ["1950's", "1960's", "1970's", "1980's", "1990's", "2000's"];
  for (let item of stagesItems) {
    createDomElement('li', stages, 'stage', null, item);
  }
  createDomElement('div', statusBlock, 'score', null, 'Score: 0');

  const questionBlock = createDomElement('div', wrapper, 'block question-block');
  createDomElement('img', questionBlock, 'question-block__band-image', { src: './assets/band_placeholder.png', alt: 'Band image', height: 153 });
  const questionBlockInfo = createDomElement('div', questionBlock, 'question-block__info');
  createDomElement('h2', questionBlockInfo, 'question-block__song-name', null, '******');

  const answerOptionsBlock = createDomElement('div', wrapper, 'block block_options answer-options-block');
  createDomElement('ul', answerOptionsBlock, 'answer-options');

  createDomElement('div', wrapper, 'block description-block description-block_quiz');
  createDomElement('button', wrapper, 'button button_next', null, 'Next Level');

  createDomElement('div', container, 'background');
}


export function renderStartPage(main) {
  main.innerHTML = '';
  const container = createDomElement('div', main, 'container container_start');
  createDomElement('h1', container, 'start-page__header', null, 'Rock Songs Quiz');
  createDomElement('h2', container, 'start-page__subheader', null, 'Test your knowledge of classic rock from the 1950s-2000s. Listen to a short piece of the song and try to guess the artist.');
  const startButton = createDomElement('button', container, 'button start-page__button', null, 'Start game');
  createDomElement('div', container, 'background');
}


export function renderResultsPage(main, score) {
  main.innerHTML = '';
  const container = createDomElement('div', main, 'container container_results');
  createDomElement('h2', container, 'results-page__header', null, 'Congratulations!');
  createDomElement('h3', container, 'results-page__subheader', null, `You passed the quiz and scored ${score} out of 30 possible points`)
  const startButton = createDomElement('button', container, 'button start-page__button', null, 'Try again');
  createDomElement('div', container, 'background');
}


export function renderGalleryPage(main) {
  main.innerHTML = '';
  const container = createDomElement('div', main, 'container container_gallery');
  createDomElement('div', container, 'gallery-page__wrapper');
  createDomElement('div', container, 'background');
}
