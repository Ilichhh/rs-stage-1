/* eslint-disable no-unused-expressions */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-inner-declarations */
/* eslint-disable arrow-parens */
import './index.html';
import './styles/main.scss';
import songsData from './data';

import playButtonImg from './assets/svg/play.svg';
import pauseButtonImg from './assets/svg/pause.svg';
import bandPlaceholder from './assets/icons/GitHub-Mark-Light-32px.png';

import playIcon from './assets/icons/play.png';
import pauseIcon from './assets/icons/pause.png';
import volumeIcon from './assets/icons/volume.png';

import createDomElement from './js/create_element';
import { renderHeader, renderFooter, renderQuizPage, renderStartPage, renderResultsPage, renderGalleryPage } from './js/render_page_elements';


const importAllMedia = (r) => r.keys().forEach(r);
importAllMedia(require.context('./assets/audio/', true, /\.mp3$/));
importAllMedia(require.context('./assets/video/', true, /\.mp4$/));
importAllMedia(require.context('./assets/background/', true, /\.(jpe?g$|png)/));
importAllMedia(require.context('./assets/images/', true, /\.(jpe?g$|png)$/));

const backgrounds = ['./assets/bg-50.jpg', './assets/bg-60.jpg', './assets/bg-70.jpg', './assets/bg-80.jpg', './assets/bg-90.jpg', './assets/bg-00.jpg'];

const gameData = {
  stage: 0,
  score: 0,
  attempts: 0,
};

const difficultyData = [
  {
    name: 'Easy',
    description: 'Choose if you\'ve been listening to rap all your life and you don\'t understand what\'s going on here. You will have the opportunity to listen to the entire song. It’s hard not to cope, because usually the text contains the name itself.',
    timeToGuess: 999,
  },
  {
    name: 'Normal',
    description: 'Normal mode for those who understand something in the subject. Listen to the first 6 seconds of the song and try to guess by the intro.',
    timeToGuess: 6,
  },
  {
    name: 'Rock Expert',
    description: 'Absolute hardcore only for true rock fans. Listen to the first 4 seconds. Only three attempts to guess, after which points are not awarded.',
    timeToGuess: 4,
  },
];

let randomTrack;
let isGuessed = false;
let activePlayButton;
let prevAudio;
let prevPlayButton;
let sampleAudio;
let difficulty = 1;

const root = document.querySelector('.body');
const header = createDomElement('header', root, 'header');
const main = createDomElement('main', root, 'main');
const footer = createDomElement('footer', root, 'footer');

let nextButton, songNameElement, bandImageElement, descriptionBlock, questionBlock, scoreElement, stagesElements, startButton, player;


window.addEventListener('DOMContentLoaded', () => {
  // Create Pages
  function init() {
    renderHeader(header, main);
    showStartPage();
    renderFooter(footer);

    const logo = document.querySelector('.logo');
    logo.addEventListener('click', showStartPage);
    const menu = document.querySelector('.menu');
    menu.addEventListener('click', showPage)
  }


  function showStartPage() {
    const links = document.querySelectorAll('.menu__link');
    links.forEach(link => link.classList.remove('menu__link_active'));
    updateMenuView(document.querySelectorAll('.menu__link')[0]);
    renderStartPage(main);
    addBackgroundVideo('./assets/Metallica.mp4');

    startButton = document.querySelector('.start-page__button');
    startButton.addEventListener('click', choseDifficulty);

    root.classList = 'body start-page';
    footer.classList.remove('footer_quiz');
  }


  function choseDifficulty() {
    const startHeader = document.querySelector('.start-page__header') || document.querySelector('.results-page__header');
    const startSubheader = document.querySelector('.start-page__subheader') || document.querySelector('.results-page__subheader');
    startSubheader.textContent = 'Select game difficulty';
    startHeader.remove();
    startButton.remove();

    const buttonsWrapper = createDomElement('div', main, 'start-page__buttons-wrapper');
    const difficultyDescription = createDomElement('div', main, 'start-page__difficulty-descr');

    difficultyData.forEach((item, index) => {
      const diffButton = createDomElement('button', buttonsWrapper, 'button start-page__button', null, item.name);
      diffButton.addEventListener('mouseover', () => {
        difficultyDescription.textContent = difficultyData[index].description;
        difficulty = index;
      });
      diffButton.addEventListener('click', showQuizPage);
    });
  }


  function showQuizPage() {
    renderQuizPage(main);
    updateMenuView(document.querySelectorAll('.menu__link')[1]);
    nextButton = document.querySelector('.button_next');
    songNameElement = document.querySelector('.question-block__song-name');
    bandImageElement = document.querySelector('.question-block__band-image');
    descriptionBlock = document.querySelector('.description-block');
    questionBlock = document.querySelector('.question-block__info');
    scoreElement = document.querySelector('.score');
    stagesElements = document.querySelectorAll('.stage');
    player = createDomElement('div', questionBlock, 'player');
    root.classList = 'body quiz-page';
    footer.classList.add('footer_quiz');

    startGame();
  }


  function showGalleryPage() {
    renderGalleryPage(main);
    setBackgroundImg(backgrounds[Math.floor(Math.random() * 6)]);
    const wrapper = document.querySelector('.gallery-page__wrapper');
    const stagesItems = ["1950's", "1960's", "1970's", "1980's", "1990's", "2000's"];
    for (let item in stagesItems) {
      const stageWrapper = createDomElement('div', wrapper, 'gallery-page__stage-wrapper');
      createDomElement('h3', stageWrapper, 'gallery-page__stage-header', null, stagesItems[item]);
      const itemsWrapper = createDomElement('div', stageWrapper, 'gallery-page__items-wrapper');
      songsData[item].forEach(band => {
        const songBlock = createDomElement('div', itemsWrapper, 'block description-block');
        showFullTrackInfo(band, songBlock);
      })
    }
  }

  function updateMenuView(activeLink) {
    const links = document.querySelectorAll('.menu__link');
    links.forEach(link => link.classList.remove('menu__link_active'));
    activeLink.classList.add('menu__link_active');
  }


  function showPage(e) {
    const page = e.target.textContent;
    updateMenuView(e.target)
    if (page === 'Home') showStartPage();
    if (page === 'Quiz') showQuizPage();
    if (page === 'Gallery') showGalleryPage();
  }

  init();


  // Background
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

  function setBackgroundImg(source) {
    const background = document.querySelector('.background');
    background.innerHTML = '';
    const backgroundImage = createDomElement('div', background, 'bg-img');
    backgroundImage.style.background = `url(${source}) center center/cover no-repeat`;
  }

  // Player
  function convertTimeFormat(time) {
    const totalSeconds = Math.floor(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
  }

  function choseRandomTrack() {
    const randomNum = Math.floor(Math.random() * 6);
    randomTrack = songsData[gameData.stage][randomNum];
    return randomTrack;
  }

  function playAudio(audio, isShort) {
    if (prevAudio) pauseAudio(prevAudio);
    if (prevPlayButton) prevPlayButton.innerHTML = playButtonImg;
    prevAudio = audio;
    if (isShort && audio.currentTime >= difficultyData[difficulty].timeToGuess) {
      audio.currentTime = 0;
    } else if (audio.currentTime >= audio.duration) {
      audio.currentTime = 0;
    }
    audio.play();
    activePlayButton.innerHTML = pauseButtonImg;
  }

  function pauseAudio(audio) {
    audio.pause();
    activePlayButton.innerHTML = playButtonImg;
  }

  function toggleAudio(audio, isShort, e) {
    prevPlayButton = activePlayButton;
    activePlayButton = e.target.closest('.player__play-btn');
    !audio.paused ? pauseAudio(audio) : playAudio(audio, isShort);
  }

  function updateTimeline(audio, currentTimeElement, playerTimeline, isShort) {
    if (!audio.paused) {
      currentTimeElement.textContent = convertTimeFormat(audio.currentTime);
      playerTimeline.value = audio.currentTime.toFixed(2) * 100;
      if (isShort && audio.currentTime >= difficultyData[difficulty].timeToGuess) {
        pauseAudio(audio);
      } else if (audio.currentTime >= audio.duration) {
        pauseAudio(audio);
      }
    }
  }

  function setTimelineMax(timeline, totalTimeElement, duration) {
    timeline.max = duration * 100;
    totalTimeElement.textContent = convertTimeFormat(duration);
  }


  function createPlayer(track, player, isShort=true) {
    player.innerHTML = '';
    const playButton = createDomElement('button', player, 'player__play-btn', { 'data-id': track.id });
    const timelineWrapper = createDomElement('div', player, 'player__timeline-wrapper');
    const playerTimeline = createDomElement('input', timelineWrapper, 'player__timeline', { type: 'range', min: 0, value: 0 });
    const timeWrapper = createDomElement('div', timelineWrapper, 'player__time');
    const currentTimeElement = createDomElement('div', timeWrapper, 'player__time-current', null, '00:00');
    const totalTimeElement = createDomElement('div', timeWrapper, 'player__time-length');
    const audio = createDomElement('audio', player, 'audio', { src: track.path });

    if (isShort) sampleAudio = audio;

    const volumeInput = createDomElement('input', player, 'player__volume', { type: 'range', min: 0, max: 100, value: 50 });
    volumeInput.addEventListener('input', e => {
      audio.volume = e.target.value / 100;
    });

    // const volumeButton = createDomElement('button', player, 'player__volume-btn');
    // createDomElement('img', volumeButton, 'player__volume-icon', { src: volumeIcon });
    console.log(playerTimeline.style.background);

    playButton.innerHTML = playButtonImg;
    playButton.addEventListener('click', e => toggleAudio(audio, isShort, e));

    playerTimeline.addEventListener('input', e => {
      audio.currentTime = e.target.value / 100;
      playerTimeline.style.background = `linear-gradient(to right, $main-bright-color 0%, $main-bright-color ${40}%, $secondary-bg-color ${40}%, $secondary-bg-color 100%)`;

      console.dir(playerTimeline.style.background);
    });

    audio.onloadedmetadata = () => {
      isShort ?
      setTimelineMax(playerTimeline, totalTimeElement, difficultyData[difficulty].timeToGuess) :
        setTimelineMax(playerTimeline, totalTimeElement, audio.duration);
    };

    setInterval(() => updateTimeline(audio, currentTimeElement, playerTimeline, isShort), 10);
  }


  // Generate answer options
  function generateAnswerOptionsBlock() {
    const answerOptionsBlock = document.querySelector('.answer-options');
    answerOptionsBlock.innerHTML = '';

    songsData[gameData.stage].forEach(song => {
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
    if (!isGuessed) {
      if (!selectedAnswerLabel.classList.contains('answer-options__indicator_correct') && 
          !selectedAnswerLabel.classList.contains('answer-options__indicator_wrong')) {
        gameData.attempts++;
      }
      const sound = new Audio();
      if (selectedAnswerID === randomTrack.id) {
        if (!sampleAudio.paused) pauseAudio(sampleAudio);
        updateScore();
        isGuessed = true;
        songNameElement.textContent = `${randomTrack.artist} - ${randomTrack.song}`;
        bandImageElement.src = randomTrack.image;
        selectedAnswerLabel.classList.add('answer-options__indicator_correct');
        nextButton.classList.add('button_next_active');
        nextButton.addEventListener('click', nextStage);
        sound.src = './assets/correct.mp3';
      } else {
        selectedAnswerLabel.classList.add('answer-options__indicator_wrong');
        sound.src = './assets/wrong.mp3';
        sound.volume = 0.15;
      }
      sound.play();
    }
  }


  // Start Stage
  function disableNextButton() {
    nextButton.removeEventListener('click', nextStage);
    nextButton.classList.remove('button_next_active');
  }

  function resetQuestionBlock() {
    songNameElement.textContent = '******';
    descriptionBlock.innerHTML = '';
    const text = difficulty === 0 ? 
      'Listen to the song and try to guess the artist.' :
      `Listen to the first ${difficultyData[difficulty].timeToGuess} seconds of the song and try to guess the artist.`;
    createDomElement('div', descriptionBlock, 'description-block__placeholder', null, text);
    bandImageElement.src = 'assets/band_placeholder.png';
  }

  function generateStage() {
    generateAnswerOptionsBlock();
    choseRandomTrack();
    disableNextButton();
    resetQuestionBlock();
    updateStagesBlockStatus();
    createPlayer(choseRandomTrack(), player, difficulty !== 0);
    setBackgroundImg(backgrounds[gameData.stage]);
  }

  function startGame() {
    gameData.stage = 0;
    gameData.score = 0;
    isGuessed = false;
    generateStage();
  }

  function nextStage() {
    gameData.stage++;
    isGuessed = false;
    if (gameData.stage > 4) nextButton.textContent = 'Show Results';
    gameData.stage > 5 ? showResultsPage() : generateStage();
  }

  function showResultsPage() {
    const links = document.querySelectorAll('.menu__link');
    links.forEach(link => link.classList.remove('menu__link_active'));
    renderResultsPage(main, gameData.score);
    footer.classList.remove('footer_quiz');
    if (gameData.score === 30) {
      addBackgroundVideo('./assets/Queen_Bohemian_Rhapsody.mp4');
    } else {
      startButton = document.querySelector('.start-page__button');
      startButton.addEventListener('click', choseDifficulty);
    }
  }


  // Update Score
  function updateScore() {
    if (difficulty !== 2 || gameData.attempts === 1) {
      gameData.score += 6 - gameData.attempts;
    } else {
      if (gameData.attempts === 2) gameData.score += 3;
      if (gameData.attempts === 3) gameData.score += 1;
    }
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
    createDomElement('img', wrapper, 'description-block__band-image', { src: track.image, height: 175, width: 175 });
    const playerWrapper = createDomElement('div', wrapper, 'description-block__player-wrapper');
    createDomElement('h2', playerWrapper, 'description-block__band-name', null, track.artist);
    createDomElement('h3', playerWrapper, 'description-block__song-name', null, track.song);

    const player = createDomElement('div', playerWrapper, 'player');
    createPlayer(track, player, false);

    createDomElement('div', block, 'description-block__band-descr', null, track.description);
  }
});
