/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-inner-declarations */
/* eslint-disable arrow-parens */
import './index.html';
import './quiz.html';
import './results.html';
import './styles/main.scss';
import songsData from './data';

import rsLogo from './assets/svg/rsschooljs.svg';
import playButtonImg from './assets/svg/play.svg';
import pauseButtonImg from './assets/svg/pause.svg';

import createDomElement from './js/create_element';

const importAllMedia = (r) => r.keys().forEach(r);
importAllMedia(require.context('./assets/audio/', true, /\.mp3$/));
importAllMedia(require.context('./assets/video/', true, /\.mp4$/));

const audio = new Audio();

const gameData = {
  timeToGuess: 6,
  stage: 0,
  score: 0,
  attempts: 0,
};


let randomTrack;
let isPlay = false;
let activePlayButton;


window.addEventListener('DOMContentLoaded', () => {
  const nextButton = document.querySelector('.button_next');
  const songNameElement = document.querySelector('.question-block__song-name');
  const bandImageElement = document.querySelector('.question-block__band-image');
  const descriptionBlock = document.querySelector('.description-block');


  // Background Video
  function addBackgroundVideo(source) {
    const bgVideoAttributes = {
      autoplay: true,
      muted: true,
      loop: true,
      id: 'video',
    };

    const background = document.querySelector('.background');
    const videoElement = createDomElement('video', background, 'bg-video', bgVideoAttributes);
    const sourceElement = createDomElement('source', videoElement, null, { src: source });
  }

  addBackgroundVideo('./assets/Queen_Bohemian_Rhapsody.mp4');

  const rsLogoElement = document.querySelector('.rs-logo');
  rsLogoElement.innerHTML = rsLogo;

  const questionBlock = document.querySelector('.question-block__info');


  // Player
  function convertTimeFormat(time) {
    const totalSeconds = Math.floor(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
  }

  function choseRandomTrack(stage) {
    const randomNum = Math.floor(Math.random() * 6);
    randomTrack = songsData[stage][randomNum];
    return randomTrack;
  }

  function playAudio() {
    if (audio.currentTime >= gameData.timeToGuess) {
      audio.currentTime = 0;
    }
    audio.play();
    activePlayButton.innerHTML = pauseButtonImg;
    isPlay = true;
  }

  function pauseAudio() {
    audio.pause();
    activePlayButton.innerHTML = playButtonImg;
    isPlay = false;
  }

  function toggleAudio(e) {
    console.log(e.target.closest('.player__play-btn').dataset.id);
    activePlayButton = e.target.closest('.player__play-btn');
    isPlay ? pauseAudio() : playAudio();
  }

  function updateTimeline(currentTimeElement, playerTimeline, playButton) {
    if (isPlay) {
      currentTimeElement.textContent = convertTimeFormat(audio.currentTime);
      playerTimeline.value = audio.currentTime.toFixed(2) * 100;
      if (audio.currentTime >= gameData.timeToGuess) {
        pauseAudio(playButton);
      }
    }
  }

  const player = createDomElement('div', questionBlock, 'player');

  function createPlayer(track, player) {
    player.innerHTML = '';
    const playButton = createDomElement('button', player, 'player__play-btn', { 'data-id': track.id });
    const timelineWrapper = createDomElement('div', player, 'player__timeline-wrapper');
    const playerTimeline = createDomElement('input', timelineWrapper, 'player__timeline', { type: 'range', min: 0, value: 0 });
    const timeWrapper = createDomElement('div', timelineWrapper, 'player__time');
    const currentTimeElement = createDomElement('div', timeWrapper, 'player__time-current', null, '00:00');
    const totalTimeElement = createDomElement('div', timeWrapper, 'player__time-length');

    playButton.innerHTML = playButtonImg;
    playButton.addEventListener('click', toggleAudio);

    playerTimeline.addEventListener('input', e => {
      audio.currentTime = e.target.value / 100;
    });

    audio.src = track.path;
    console.log(audio.src);

    playerTimeline.max = gameData.timeToGuess * 100;
    totalTimeElement.textContent = convertTimeFormat(gameData.timeToGuess);

    setInterval(() => updateTimeline(currentTimeElement, playerTimeline), 10);
  }


  // Generation of answer options
  function generateAnswerOptionsBlock(stage) {
    const answerOptionsBlock = document.querySelector('.answer-options');
    answerOptionsBlock.innerHTML = '';

    songsData[stage].forEach(song => {
      const answerOptionElement = createDomElement('li', answerOptionsBlock, 'answer-options__option', { 'data-id': song.id });
      const answerOptionLabel = createDomElement('span', answerOptionElement, 'answer-options__indicator');
      answerOptionElement.insertAdjacentHTML('beforeend', `${song.artist} - ${song.song}`);
    });

    answerOptionsBlock.addEventListener('click', checkAnswer);
  }


  // Check answer
  function checkAnswer(e) {
    const selectedAnswer = e.target.closest('.answer-options__option');
    const selectedAnswerID = +selectedAnswer.dataset.id;
    const selectedAnswerLabel = selectedAnswer.children[0];

    showFullTrackInfo(songsData[gameData.stage][selectedAnswerID - 1], descriptionBlock);

    if (selectedAnswerID === randomTrack.id) {
      songNameElement.textContent = `${randomTrack.artist} - ${randomTrack.song}`;
      bandImageElement.src = randomTrack.image;
      selectedAnswerLabel.classList.add('answer-options__indicator_correct');
      nextButton.classList.add('button_next_active');

      nextButton.addEventListener('click', nextStage);
    } else {
      selectedAnswerLabel.classList.add('answer-options__indicator_wrong');
    }
    gameData.attempts++;
  }


  // Start Stage
  function disableNextButton() {
    nextButton.removeEventListener('click', nextStage);
    nextButton.classList.remove('button_next_active');
  }

  function resetQuestionBlock() {
    songNameElement.textContent = '******';
    bandImageElement.src = 'assets/band_placeholder.png';
  }

  const scoreElement = document.querySelector('.score');
  const stagesElements = document.querySelectorAll('.stage');

  function startGame() {
    gameData.stage = 0;
    generateAnswerOptionsBlock(gameData.stage);
    choseRandomTrack(gameData.stage);
    disableNextButton();
    resetQuestionBlock();
    updateStagesBlockStatus();
    createPlayer(choseRandomTrack(gameData.stage), player);
  }

  function nextStage() {
    gameData.stage++;
    generateAnswerOptionsBlock(gameData.stage);
    choseRandomTrack(gameData.stage);
    disableNextButton();
    resetQuestionBlock();
    updateStagesBlockStatus();
    updateScore();
    createPlayer(choseRandomTrack(gameData.stage), player);
  }

  startGame(gameData.stage);


  // Update Score
  function updateScore() {
    gameData.score += 6 - gameData.attempts;
    gameData.attempts = 0;
    scoreElement.textContent = `Score: ${gameData.score}`;
  }

  function updateStagesBlockStatus() {
    stagesElements.forEach((element, index) => {
      element.classList = 'stage';
      if (index === gameData.stage) element.classList.add('stage_current');
    });
  }

  function showFullTrackInfo(track, block) {
    block.innerHTML = '';
    const wrapper = createDomElement('div', block, 'description-block__wrapper');
    createDomElement('img', wrapper, 'description-block__band-image', { src: track.image, height: 200 });
    const playerWrapper = createDomElement('div', wrapper, 'description-block__player-wrapper');
    createDomElement('h2', playerWrapper, 'description-block__song-name', null, track.song);
    createDomElement('h3', playerWrapper, 'description-block__band-name', null, track.artist);
    createDomElement('div', playerWrapper, 'player', null, 'this is player');
  }
});
