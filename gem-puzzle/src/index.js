/* eslint-disable arrow-parens */
import './index.html';
import './index.scss';

window.addEventListener('DOMContentLoaded', () => {
  const sizes = [9, 16, 25, 36, 49, 64];
  const flatArray = [];
  const matrix = [];
  const buttonCoords = {};
  const blankCoords = {};
  const settings = {
    countItems: 16,
  };

  document.body.innerHTML = `
    <main class="container">
      <h1 class="header">Gem Puzzle</h1>
      <button class="button menu">MENU</button>
      <div class="field"></div>
      <div class="size-wrapper"></div>
      <button class="button shuffle">NEW GAME</button>
    </main>
  `;

  const field = document.querySelector('.field');
  const shuffleButton = document.querySelector('.shuffle');

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
    sizes.forEach(size => {
      sizeBlock.innerHTML += `
        <label class="size">
          <input type="radio" name="size" value="${size}"${size === 16 ? ' checked' : ''}>${Math.sqrt(size)}x${Math.sqrt(size)}
        </label>
      `;
    });
  }

  const sizeOptions = document.querySelector('.size-wrapper');

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
    }
    if (isPuzzleSolved()) {
      console.log('Solved!');
    }
  }

  function randomMove(buttonsArr) {
    const swapableArr = flatArray.filter(piece => isMovable(piece));
    const randomPiece = swapableArr[Math.floor(Math.random() * swapableArr.length)];
    buttonsArr[randomPiece - 1].click();
  }

  function shuffle(countItems) {
    const buttonsArr = [...document.querySelectorAll('.piece')];
    for (let i = 0; i < countItems * 10; i++) {
      randomMove(buttonsArr);
    }
  }

  function generateField(size) {
    settings.countItems = size;
    createFieldDom(settings.countItems);
    generateMatrix(flatArray);
    setItemsPosition();
  }

  createChoseSizeDom();
  generateField(16);

  field.addEventListener('click', e => {
    const button = e.target.closest('.piece');
    move(button);
  });

  shuffleButton.addEventListener('click', () => shuffle(settings.countItems));

  sizeOptions.addEventListener('click', (e) => {
    const size = +e.target.value;
    if (size) {
      generateField(size);
      shuffle(size);
    }
  });

  shuffle(settings.countItems);
});
