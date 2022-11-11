/* eslint-disable no-inner-declarations */
/* eslint-disable arrow-parens */
import './index.html';
import './quiz.html';
import './results.html';
import './styles/main.scss';

import introMetallica from './assets/video/Metallica.mp4';
import rsLogo from './assets/svg/rsschooljs.svg';

window.addEventListener('DOMContentLoaded', () => {
  function addBackgroundVideo(source) {
    const background = document.querySelector('.background');
    const videoElement = document.createElement('video');
    const sourceElement = document.createElement('source');
    videoElement.setAttribute('id', 'video');

    sourceElement.src = source;

    videoElement.appendChild(sourceElement);
    background.appendChild(videoElement);

    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
  }

  addBackgroundVideo(introMetallica);

  const rsLogoElement = document.querySelector('.rs-logo');
  rsLogoElement.innerHTML = rsLogo;
});
