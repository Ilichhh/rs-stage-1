/* eslint-disable arrow-parens */
import './index.html';
import './index.scss';

window.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = `
    <main class="container">
      <h1 class="header">Puzzle</h1>
      <div class="field"></div>
      <button class="shuffle">shuffle</button>
    </main>
  `;

  const field = document.querySelector('.field');
  const flatArray = [];
  const matrix = [];
  const buttonCoords = {};
  const blankCoords = {};
  let countItems = 25;

  for (let i = 1; i <= countItems; i++) {
    flatArray.push(i);
  }

  flatArray.forEach(item => {
    field.innerHTML += `
      <button class="piece" data-piece-id="${item}">${item}</button>
    `;
  });

  function generateMatrix(arr) {
    const sideLengt = Math.sqrt(arr.length);
    for (let i = 1; i <= sideLengt; i++) {
      matrix.push([]);
      for (let j = 1; j <= sideLengt; j++) {
        matrix[i - 1].push(j + sideLengt * (i - 1));
      }
    }
    console.log(matrix);
  }

  function setItemsPosition(matrix) {
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        const item = document.querySelectorAll('.piece')[matrix[y][x] - 1];
        item.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
        item.style.width = `calc(100% / ${matrix[y].length})`;
        item.style.height = `calc(100% / ${matrix.length})`;
      }
    }
  }

  generateMatrix(flatArray);
  setItemsPosition(matrix);

  field.addEventListener('click', e => {
    const button = e.target.closest('.piece');
    if (!button) return null;
    const buttonId = +button.dataset.pieceId;
    if (isSwapable(buttonId, matrix)) {
      matrix[buttonCoords.y][buttonCoords.x] = flatArray.length;
      matrix[blankCoords.y][blankCoords.x] = buttonId;
      setItemsPosition(matrix);
    }
    if (isPuzzleSolved(matrix, flatArray)) {
      console.log('Solved!');
    }
  });

  function isSwapable(buttonId, matrix) {
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

  function isPuzzleSolved(matrix, flatArray) {
    return matrix.join(',') === flatArray.join(',');
  }

  function randomSwap(matrix, buttonsArr) {
    const swapableArr = flatArray.filter(piece => isSwapable(piece, matrix));
    const randomPiece = swapableArr[Math.floor(Math.random() * swapableArr.length)];
    buttonsArr[randomPiece - 1].click();
  }

  function shuffle(matrix, countItems) {
    const buttonsArr = [...document.querySelectorAll('.piece')];
    for (let i = 0; i < countItems * 10; i++) {
      randomSwap(matrix, buttonsArr);
    }
  }

  const shuffleButton = document.querySelector('.shuffle');

  shuffleButton.addEventListener('click', () => shuffle(matrix, countItems));
});
