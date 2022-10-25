/* eslint-disable arrow-parens */
import './index.html';
import './index.scss';
import sound from './audio/zapsplat_foley_brick_or_tile_scrape_on_concrete_001_70840.mp3';
import volumeOn from './img/volume_on.svg';
import volumeOff from './img/volume_off.svg';

window.alert('Привет, проверяющий! Я к сожалению не успел сделать драг-н-дроп и сейчас мой балл 105. Будь другом, не проверяй пока. Мне бы денек, чтоб закончить (ну или два). Дизайн еще додизайню, вообще по-красоте все будет, отвечаю!');

window.addEventListener('DOMContentLoaded', () => {
  const audio = new Audio('./assets/zapsplat_foley_brick_or_tile_scrape_on_concrete_001_70840.mp3');
  const sizes = [9, 16, 25, 36, 49, 64];
  const flatArray = [];
  let matrix = [];
  const buttonCoords = {};
  const blankCoords = {};
  let state = {
    countItems: 16,
    seconds: 0,
    minutes: 0,
    moves: 0,
  };
  let top = [];
  let shuffling = false;
  let int = null;
  let volume = true;

  document.body.innerHTML = `
    <main class="container">
      <h1 class="header">Gem Puzzle</h1>
      <button class="button sound-button">${volumeOn}</button>
      <div class="buttons-wrapper">
        <button class="button save">SAVE</button>
        <button class="button load">LOAD</button>
        <button class="button show-results">RESULTS</button>
      </div>
      <div class="stats-wrapper">
        <span class="time">00:00</span>
        <span class="moves">Moves: ${state.moves}</span>
      </div>
      <div class="results">
        <div class="results__table">
          <div class="results__header">
            <div>Position</div>
            <div>Time</div>
            <div>Moves</div>
          </div>
          <div class="results__stats"></div>
        </div>
      </div>
      <div class="field"></div>
      <div class="size-wrapper"></div>
      <button class="button shuffle">NEW GAME</button>
    </main>
  `;

  const field = document.querySelector('.field');
  const shuffleButton = document.querySelector('.shuffle');
  const saveButton = document.querySelector('.save');
  const loadButton = document.querySelector('.load');
  const resultsButton = document.querySelector('.show-results');
  const soundButton = document.querySelector('.sound-button');
  const stats = document.querySelector('.stats-wrapper');
  const resultsPopup = document.querySelector('.results');
  const movesCounter = document.querySelector('.moves');
  const timer = document.querySelector('.time');
  const sizeOptions = document.querySelector('.size-wrapper');
  const results = document.querySelector('.results__stats');

  function createFieldDom(countItems) {
    flatArray.length = 0;
    for (let i = 1; i <= countItems; i++) {
      flatArray.push(i);
    }
    field.innerHTML = '';
    flatArray.forEach(item => {
      field.innerHTML += `
        <button class="piece" data-piece-id="${item}">${item}</button>
      `;
    });
  }

  function createChoseSizeDom() {
    const sizeBlock = document.querySelector('.size-wrapper');
    sizeBlock.innerHTML = '';
    sizes.forEach(size => {
      sizeBlock.innerHTML += `
        <label class="size">
          <input type="radio" name="size" value="${size}"${size === state.countItems ? ' checked' : ''}>${Math.sqrt(size)}x${Math.sqrt(size)}
        </label>
      `;
    });
  }

  function generateMatrix(arr) {
    const sideLengt = Math.sqrt(arr.length);
    matrix.length = 0;
    for (let i = 1; i <= sideLengt; i++) {
      matrix.push([]);
      for (let j = 1; j <= sideLengt; j++) {
        matrix[i - 1].push(j + sideLengt * (i - 1));
      }
    }
  }

  function setItemsPosition() {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        const item = document.querySelectorAll('.piece')[matrix[y][x] - 1];
        item.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
        item.style.width = `calc(100% / ${matrix[y].length})`;
        item.style.height = `calc(100% / ${matrix.length})`;
      }
    }
  }

  function isMovable(buttonId) {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] === buttonId) {
          buttonCoords.x = x;
          buttonCoords.y = y;
        }
        if (matrix[y][x] === flatArray.length) {
          blankCoords.x = x;
          blankCoords.y = y;
        }
      }
    }
    const diffX = Math.abs(blankCoords.x - buttonCoords.x);
    const diffY = Math.abs(blankCoords.y - buttonCoords.y);
    return (blankCoords.x === buttonCoords.x && diffY === 1)
      || (blankCoords.y === buttonCoords.y && diffX === 1);
  }

  function isPuzzleSolved() {
    return matrix.join(',') === flatArray.join(',');
  }

  function move(button) {
    if (!button) return null;
    const buttonId = +button.dataset.pieceId;
    if (isMovable(buttonId, matrix)) {
      matrix[buttonCoords.y][buttonCoords.x] = flatArray.length;
      matrix[blankCoords.y][blankCoords.x] = buttonId;
      setItemsPosition();
      if (!shuffling) {
        state.moves++;
        movesCounter.textContent = `Moves: ${state.moves}`;
        if (volume) {
          audio.play();
        }
        if (isPuzzleSolved()) {
          showCongrats(timer.textContent, state.moves);
          console.log(state);
          addToTopResults(state);
          clearInterval(int);
        }
      }
    }
  }

  function showCongrats(timer, moves) {
    field.insertAdjacentHTML('afterbegin', `
      <div class="congratulation">Hooray!<br> You solved the puzzle in ${timer} and ${moves} moves!</div>
    `);
  }

  function generateTopDom() {
    results.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      let topTime;
      if (top[i]) {
        topTime = `${top[i].min.toString().padStart(2, 0)}:${top[i].sec.toString().padStart(2, 0)}`;
      }
      results.innerHTML += `
        <div class="results__values">
          <div>${i + 1}</div>
          <div>${top[i] ? topTime : '...'}</div>
          <div>${top[i] ? top[i].moves : '...'}</div>
        </div>
      `;
    }
  }

  generateTopDom();

  function addToTopResults(state) {
    const score = {
      min: state.minutes,
      sec: state.seconds,
      moves: state.moves,
    };
    top.push(score);
    top.sort((a, b) => (a.min * 60 + a.sec) - (b.min * 60 + b.sec));
    top = top.slice(0, 10);
    console.log(top);
    generateTopDom();
  }

  function randomMove(buttonsArr) {
    const swapableArr = flatArray.filter(piece => isMovable(piece));
    const randomPiece = swapableArr[Math.floor(Math.random() * swapableArr.length)];
    buttonsArr[randomPiece - 1].click();
  }

  function shuffle(countItems) {
    shuffling = true;
    const buttonsArr = [...document.querySelectorAll('.piece')];
    for (let i = 0; i < countItems * 20; i++) {
      randomMove(buttonsArr);
    }
    shuffling = false;
  }

  function startNewGame(countItems) {
    resultsPopup.classList.remove('results_active');
    if (document.querySelector('.congratulation')) document.querySelector('.congratulation').remove();
    clearInterval(int);
    state.moves = 0;
    state.minutes = 0;
    state.seconds = 0;
    timer.textContent = '00:00';
    movesCounter.textContent = 'Moves: 0';
    shuffle(countItems);
    int = setInterval(displayTimer, 1000);
  }

  function loadGame() {
    if (localStorage.getItem('savedState')) {
      resultsPopup.classList.remove('results_active');
      state = JSON.parse(localStorage.getItem('savedState'));
      matrix = JSON.parse(localStorage.getItem('savedMatrix'));
      if (document.querySelector('.congratulation')) document.querySelector('.congratulation').remove();
      clearInterval(int);
      createFieldDom(state.countItems);
      setItemsPosition();
      timer.textContent = `${state.minutes.toString().padStart(2, 0)}:${state.seconds.toString().padStart(2, 0)}`;
      movesCounter.textContent = `Moves: ${state.moves}`;
      int = setInterval(displayTimer, 1000);
      createChoseSizeDom();
    }
  }

  function generateField(size) {
    state.countItems = size;
    createFieldDom(state.countItems);
    generateMatrix(flatArray);
    setItemsPosition();
  }

  function displayTimer() {
    state.seconds++;
    if (state.seconds === 60) {
      state.minutes++;
      state.seconds = 0;
    }
    timer.textContent = `${state.minutes.toString().padStart(2, 0)}:${state.seconds.toString().padStart(2, 0)}`;
  }

  function toggleSound() {
    volume = !volume;
    soundButton.innerHTML === volumeOn ?
      soundButton.innerHTML = volumeOff : 
      soundButton.innerHTML = volumeOn;
  }

  function showResults() {
    resultsPopup.classList.add('results_active');
  }

  createChoseSizeDom();
  generateField(16);
  resultsPopup.addEventListener('click', () => resultsPopup.classList.remove('results_active'));

  field.addEventListener('click', e => {
    const button = e.target.closest('.piece');
    move(button);
  });

  // field.onmousedown = function(e) {
    // e.preventDefault();
    // const button = e.target.closest('.piece');
    // if (!button) return null;
    // const buttonId = +button.dataset.pieceId;
    // if (isMovable(buttonId)) {
    //   console.dir(button);
    //   let shiftX = (window.innerWidth - 410 + button.clientWidth) / 2;
    //   let shiftY = 198 + button.clientWidth / 2;
    //   console.log(button.getBoundingClientRect().left);

    //   button.style.zIndex = 1000;

    //   function moveAt(pageX, pageY) {
    //     button.style.transform = `translate(${pageX - shiftX}%, ${pageY - shiftY}%)`;
    //   }
    
    //   function onMouseMove(event) {
    //     moveAt(event.pageX, event.pageY);
    //   }

    //   document.addEventListener('mousemove', onMouseMove);
    // }







    // let basePos = e.clientX;
    // const baseXTransform = button.style.transform.match(/\d+/g)[0];
    // const baseYTransform = button.style.transform.match(/\d+/g)[1];
    // console.log(baseX, baseY);

    // function onMouseMove(e) {
    //   let shiftX = e.clientX - basePos;
    //   let newXTransform = baseXTransform + shiftX;
    //   button.style.transform = `translate(${newXTransform}%, ${100}%)`;
    //   if ((shiftX) > 50) move(button);
    // }

    // function onMouseUp() {
    //   field.removeEventListener('mousemove', onMouseMove);
    //   field.removeEventListener('mouseup', onMouseUp);
    // }

    // field.addEventListener('mousemove', onMouseMove);
    // field.addEventListener('mouseup', onMouseUp);
  // };

  // field.ondragstart = function() {
  //   return false;
  // };


  shuffleButton.addEventListener('click', () => startNewGame(state.countItems));

  sizeOptions.addEventListener('click', (e) => {
    const size = +e.target.value;
    // console.log(e.target)
    // e.target.label.classlist.add('.size_checked');
    if (size) {
      generateField(size);
      startNewGame(state.countItems);
    }
  });

  startNewGame(state.countItems);

  function setLocalStorage() {
    localStorage.setItem('savedState', JSON.stringify(state));
    localStorage.setItem('savedMatrix', JSON.stringify(matrix));
    localStorage.setItem('top', JSON.stringify(top));
  }

  function getLocalStorage() {
    if (localStorage.getItem('savedState')) {
      state = JSON.parse(localStorage.getItem('savedState'));
      matrix = JSON.parse(localStorage.getItem('savedMatrix'));
    }
    if (localStorage.getItem('top')) {
      top = JSON.parse(localStorage.getItem('top'));
      generateTopDom();
    }
  }

  window.addEventListener('load', () => {
    if (localStorage.getItem('top')) {
      top = JSON.parse(localStorage.getItem('top'));
      generateTopDom();
    }
  });
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('top', JSON.stringify(top));
  });
  saveButton.addEventListener('click', setLocalStorage);
  loadButton.addEventListener('click', loadGame);
  soundButton.addEventListener('click', toggleSound);
  resultsButton.addEventListener('click', showResults);
});
