/* eslint-disable arrow-parens */
import './index.html';
import './index.scss';

window.addEventListener('DOMContentLoaded', () => {
  const flatArray = [];
  const matrix = [];
  const buttonCoords = {};
  const blankCoords = {};
  const settings = {
    countItems: 16,
  };

  document.body.innerHTML = `
    <main class="container">
      <h1 class="header">Puzzle</h1>
      <div class="field"></div>
      <button class="shuffle">shuffle</button>
    </main>
  `;

  const field = document.querySelector('.field');
  const shuffleButton = document.querySelector('.shuffle');

  function createFieldDom(countItems) {
    for (let i = 1; i <= countItems; i++) {
      flatArray.push(i);
    }
    flatArray.forEach(item => {
      field.innerHTML += `
        <button class="piece" data-piece-id="${item}">${item}</button>
      `;
    });
  }

  function generateMatrix(arr) {
    const sideLengt = Math.sqrt(arr.length);
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

  createFieldDom(settings.countItems);
  generateMatrix(flatArray);
  setItemsPosition();

  field.addEventListener('click', e => {
    const button = e.target.closest('.piece');
    move(button);
  });

  shuffleButton.addEventListener('click', () => shuffle(settings.countItems));

  shuffle(settings.countItems);
});
