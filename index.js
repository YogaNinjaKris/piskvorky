'use strict';

let player = false;

const activePlayer = document.querySelector('.info');

const Play = (event) => {
  if (player) {
    event.target.classList.add('hraci__pole--cross');
    event.target.disabled=true;
     activePlayer.classList.remove('info-krizek');
     activePlayer.classList.toggle('info-kolecko');
  } else {
    event.target.classList.add('hraci__pole--circle');
    event.target.disabled=true;
     activePlayer.classList.remove('info-kolecko');
     activePlayer.classList.toggle('info-krizek');
  }
  player = !player;
};

const btnElm = document.querySelectorAll('button');
for (let i = 0; i < btnElm.length; i += 1) {
  btnElm[i].addEventListener('click', Play);
}
