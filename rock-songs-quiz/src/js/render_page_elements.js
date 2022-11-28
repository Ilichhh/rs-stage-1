import createDomElement from './create_element';
import logo from '../assets/images/Logo.png';
import rsLogo from '../assets/svg/rsschooljs.svg';
import ghLogo from '../assets/icons/GitHub-Mark-Light-32px.png';
import meme0 from '../assets/images/0.jpg';
import meme1 from '../assets/images/1.jpg';
import meme2 from '../assets/images/2.jpg';

const memeArr = [meme0, meme1, meme2];
const congratsArr = ['Are you a Morgenshtern fan?', 'Not bad, but you can definitely do better!', 'Very good, now try to get the maximum score!'];


export function renderHeader(header) {
  const container = createDomElement('div', header, 'container container_header');
  const logoElement = createDomElement('a', container, 'logo');
  createDomElement('img', logoElement, 'logo', { src: logo, alt: 'logo', width: 70 });
  const nav = createDomElement('nav', container, 'nav');
  const menu = createDomElement('ul', nav, 'menu');
  const menuItems = ['Home', 'Quiz', 'Gallery'];
  menuItems.forEach(item => {
    const li = createDomElement('li', menu, 'menu__item');
    createDomElement('a', li, 'menu__link', { href: '#' }, item);
  });
}


export function renderFooter(footer) {
  const container = createDomElement('div', footer, 'container container_footer');
  const rsWrapper = createDomElement('div', container, 'social');
  const rsLogoElement = createDomElement('a', rsWrapper, 'rs-logo', { href: 'https://rs.school/js/', target: '_blank' });
  createDomElement('div', container, 'year', null, '&copy; 2022');
  const ghWrapper = createDomElement('div', container, 'social');
  const ghLogoElement = createDomElement('a', ghWrapper, null, { href: 'https://github.com/Ilichhh', target: '_blank' });
  createDomElement('img', ghLogoElement, null, { src: ghLogo, alt: 'github' });
  rsLogoElement.innerHTML = rsLogo;
}


export function renderQuizPage(main) {
  main.innerHTML = '';
  const container = createDomElement('div', main, 'container');
  const wrapper = createDomElement('div', container, 'quiz-wrapper');
  const statusBlock = createDomElement('div', wrapper, 'status-block');
  const stages = createDomElement('ul', statusBlock, 'stages');
  const stagesItems = ["1950's", "1960's", "1970's", "1980's", "1990's", "2000's"];
  stagesItems.forEach(item => {
    createDomElement('li', stages, 'stage', null, item);
  });
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
  createDomElement('button', container, 'button start-page__button', null, 'Start game');
  createDomElement('div', container, 'background');
}


export function renderResultsPage(main, score) {
  main.innerHTML = '';
  const container = createDomElement('div', main, 'container container_results');
  const index = +score.toString().padStart(2, '0')[0];
  if (score === 30) {
    createDomElement('h2', container, 'results-page__header', null, 'Congratulations!');
    createDomElement('h3', container, 'results-page__header', null, 'You got the maximum score!');
  } else {
    createDomElement('h2', container, 'results-page__header', null, congratsArr[index]);
    createDomElement('h3', container, 'results-page__subheader', null, `You passed the quiz and scored ${score} out of 30 possible points`);
    createDomElement('img', container, 'meme', { src: memeArr[index] });
    createDomElement('button', container, 'button start-page__button', null, 'Try again');
  }
  createDomElement('div', container, 'background');
}


export function renderGalleryPage(main) {
  main.innerHTML = '';
  const container = createDomElement('div', main, 'container container_gallery');
  createDomElement('div', container, 'gallery-page__wrapper');
  createDomElement('div', container, 'background');
}


// Set Background
export function addBackgroundVideo(source) {
  const bgVideoAttributes = {
    autoplay: true,
    muted: true,
    loop: true,
    id: 'video',
  };
  const background = document.querySelector('.background');
  const videoElement = createDomElement('video', background, 'bg-video', bgVideoAttributes);
  createDomElement('source', videoElement, null, { src: source });
}


export function setBackgroundImg(source) {
  const background = document.querySelector('.background');
  background.innerHTML = '';
  const backgroundImage = createDomElement('div', background, 'bg-img');
  backgroundImage.style.background = `url(${source}) center center/cover no-repeat`;
}
