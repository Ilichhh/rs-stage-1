/* eslint-disable no-inner-declarations */
/* eslint-disable arrow-parens */
import './index.html';
import './quiz.html';
import './results.html';
import './styles/main.scss';
import songsData from './data';

import introMetallica from './assets/video/Metallica.mp4';
import rsLogo from './assets/svg/rsschooljs.svg';
import playButtonImg from './assets/svg/play.svg';
import pauseButtonImg from './assets/svg/pause.svg';

const importAll = (r) => r.keys().forEach(r);
importAll(require.context('./assets/audio/', true, /\.mp3$/));


window.addEventListener('DOMContentLoaded', () => {
  function addBackgroundVideo(source) {
    const background = document.querySelector('.background');
    const videoElement = document.createElement('video');
    const sourceElement = document.createElement('source');
    videoElement.setAttribute('id', 'video');

    sourceElement.src = source;

    videoElement.appendChild(sourceElement);
    videoElement.classList.add('bg-video');
    background.appendChild(videoElement);

    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.loop = true;
  }

  addBackgroundVideo(introMetallica);

  const rsLogoElement = document.querySelector('.rs-logo');
  rsLogoElement.innerHTML = rsLogo;

  // Player
  const playButton = document.querySelector('.player__play-btn');
  const playerTimeline = document.querySelector('.player__timeline');
  const currentTimeElement = document.querySelector('.player__time-current');
  const totalTimeElement = document.querySelector('.player__time-length');

  playButton.innerHTML = playButtonImg;

  let isPlay = false;
  const timeToGuess = 6;


  const audio = new Audio(songsData[0][1].path);

  function playAudio() {
    if (audio.currentTime >= timeToGuess) {
      audio.currentTime = 0;
    }
    audio.play();
    playButton.innerHTML = pauseButtonImg;
    isPlay = true;
  }

  function pauseAudio() {
    audio.pause();
    playButton.innerHTML = playButtonImg;
    isPlay = false;
  }

  function toggleAudio() {
    isPlay ? pauseAudio() : playAudio();
  }

  function convertTimeFormat(time) {
    const totalSeconds = Math.floor(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
  }

  function updateTimeline() {
    if (isPlay) {
      currentTimeElement.textContent = convertTimeFormat(audio.currentTime);
      playerTimeline.value = audio.currentTime.toFixed(2) * 100;
      if (audio.currentTime >= timeToGuess) {
        pauseAudio();
      }
    }
  }

  function displayTotalTime(time) {
    playerTimeline.max = timeToGuess * 100;
    totalTimeElement.textContent = convertTimeFormat(time);
  }

  displayTotalTime(timeToGuess);

  playButton.addEventListener('click', toggleAudio);

  playerTimeline.addEventListener('input', e => {
    audio.currentTime = e.target.value / 100;
  });

  setInterval(updateTimeline, 10);
});
