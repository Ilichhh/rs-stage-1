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

const importAllMusic = (r) => r.keys().forEach(r);
importAllMusic(require.context('./assets/audio/', true, /\.mp3$/));

const gameData = {
  timeToGuess: 6,
  stage: 0,
  score: 0,
};

const audio = new Audio();
let randomTrack;
let isPlay = false;


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

  function playAudio() {
    if (audio.currentTime >= gameData.timeToGuess) {
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
      if (audio.currentTime >= gameData.timeToGuess) {
        pauseAudio();
      }
    }
  }

  function displayTotalTime(time) {
    playerTimeline.max = gameData.timeToGuess * 100;
    totalTimeElement.textContent = convertTimeFormat(time);
  }

  displayTotalTime(gameData.timeToGuess);

  playButton.addEventListener('click', toggleAudio);

  playerTimeline.addEventListener('input', e => {
    audio.currentTime = e.target.value / 100;
  });

  setInterval(updateTimeline, 10);

  //Generation of answer options
  function generateAnswerOptionsBlock(stage) {
    const answerOptionsBlock = document.querySelector('.answer-options');
    answerOptionsBlock.innerHTML = '';

    songsData[stage].forEach(song => {
      const answerOptionElement = document.createElement('li');
      answerOptionElement.classList = 'answer-options__option';
      answerOptionElement.setAttribute('data-id', song.id);
      answerOptionsBlock.appendChild(answerOptionElement);
      const answerOptionLabel = document.createElement('span');
      answerOptionLabel.classList = 'answer-options__indicator';
      answerOptionElement.appendChild(answerOptionLabel);
      answerOptionElement.insertAdjacentHTML('beforeend', `${song.artist} - ${song.song}`);
    });

    answerOptionsBlock.addEventListener('click', checkAnswer);
  }

  function choseRandomTrack(stage) {
    const randomNum = Math.floor(Math.random() * 6);
    randomTrack = songsData[stage][randomNum];
    audio.src = randomTrack.path;
  }

  //Check answer
  const nextButton = document.querySelector('.button_next');
  const songNameElement = document.querySelector('.question-block__song-name');
  const bandImageElement = document.querySelector('.question-block__band-image');

  function checkAnswer(e) {
    const selectedAnswer = e.target.closest('.answer-options__option');
    const selectedAnswerLabel = selectedAnswer.children[0];
    if (+selectedAnswer.dataset.id === randomTrack.id) {
      songNameElement.textContent = `${randomTrack.artist} - ${randomTrack.song}`;
      bandImageElement.src = randomTrack.image;
      selectedAnswerLabel.classList.add('answer-options__indicator_correct');
      nextButton.classList.add('button_next_active');
      gameData.stage++;
      nextButton.addEventListener('click', startStage);
    } else {
      selectedAnswerLabel.classList.add('answer-options__indicator_wrong');
    }
  }

  // Start Stage
  function disableNextButton() {
    nextButton.removeEventListener('click', startStage);
    nextButton.classList.remove('button_next_active');
  }

  function resetQuestionBlock() {
    songNameElement.textContent = '******';
    bandImageElement.src = 'assets/band_placeholder.png';
    playerTimeline.value = 0;
  }

  function startStage() {
    console.log(gameData.stage);
    generateAnswerOptionsBlock(gameData.stage);
    choseRandomTrack(gameData.stage);
    disableNextButton();
    resetQuestionBlock();
  }

  startStage(gameData.stage);
});
