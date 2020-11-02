'use strict';

let player = false;
let i = 0;

const activePlayer = document.querySelector('.info');
const btnElm = document.querySelectorAll('button');

const Play = (event) => {
  if (player) {
    event.target.classList.add('hraci__pole--cross');
    event.target.disabled=true;
     activePlayer.classList.remove('info-krizek');
     activePlayer.classList.toggle('info-kolecko');
     winner(event.target);
  } else {
    event.target.classList.add('hraci__pole--circle');
    event.target.disabled=true;
     activePlayer.classList.remove('info-kolecko');
     activePlayer.classList.toggle('info-krizek');
     winner(event.target);
  }
  player = !player;
};


for (let i = 0; i < btnElm.length; i += 1) {
  btnElm[i].addEventListener('click', Play);
}

//část 5
//orientace v hracím poli: jaký řádek a sloupec - 10x10

const boardSize = 10; 

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < btnElm.length) {
    if (field === btnElm[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }
  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};
//getField(row, column) - je bud'to řádek nebo sloupec - row,column)
const getField = (row, column) => btnElm[row * boardSize + column];

//getSymbol(field) - vrací, co je v políčku za symbol - křížek nebo kolečko

const getSymbol = (field) => {
  if (field.classList.contains('hraci__pole--cross')) {
    return 'cross';
  } else if (field.classList.contains('hraci__pole--circle')) {
    return 'circle';
  }
};

//výherní funkce isWinningMove

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;
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

const winner = (field) => {
  if (isWinningMove(field) === true) {
    if (getSymbol(field) === 'circle') {
      confirm('Vyhrává kolečko! Chcete si dát výherní jízdu ještě jednou?');
      location.reload();
    } else if (getSymbol(field) === 'cross') {
      confirm('Vyhrává křížek! Chcete si dát výherní jízdu ještě jednou?');
      location.reload();
    }
  }
};
