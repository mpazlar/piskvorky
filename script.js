'use strict';
console.log('Funguje');

let player = 'circle';

const hrajeEl = document.querySelector('#naRade');
const btnsEl = document.querySelectorAll('.hraci_pole');

//Funkční verze 2 - lepší
const myScript = function (btnPressed) {
  btnPressed.classList.add(`board__field--${player}`);
  btnPressed.setAttribute('disabled', '');

  player = player === 'circle' ? 'cross' : 'circle';
  hrajeEl.src = `images/${player}.svg`;

  hrajeEl.alt = `${player === 'circle' ? 'Kolečko' : 'Křížek'}`;
  let kdoVyhral = null;
  if (player === 'cross') {
    kdoVyhral = 'vyhrálo kolečko';
  } else if (player === 'circle') {
    kdoVyhral = 'vyhrál křížek';
  }
  if (isWinningMove(btnPressed)) {
    if (window.confirm(`${kdoVyhral}`)) {
      location.reload();
    }
  }
};

btnsEl.forEach((btnPressed) => {
  btnPressed.addEventListener('click', function () {
    myScript(btnPressed);
  });
});

// Úkol 5

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  } else {
    return undefined;
  }
};

const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.hraci_pole');

const getField = (row, column) => fields[row * boardSize + column];

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
