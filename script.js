'use strict';

let player0Score = document.getElementById('score--0');
let player1Score = document.getElementById('score--1');

let dice = document.querySelector('.dice');

let btnHold = document.querySelector('.btn--hold');

let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

let player0Current = document.getElementById('current--0');
let player1Current = document.getElementById('current--1');

player0Score.textContent = '0';
player1Score.textContent = '0';
dice.classList.add('hidden');

let scores = [0, 0];
let curentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  curentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = curentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    let randomNumber = Math.floor(Math.random() * 6 + 1);
    dice.src = 'dice-' + randomNumber + '.png';
    dice.classList.remove('hidden');

    if (randomNumber !== 1) {
      curentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        curentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += curentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } won.`;

      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

const init = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  curentScore = 0;
  player0Current.textContent = curentScore;
  player1Current.textContent = curentScore;
  scores = [0, 0];
  player0Score.textContent = scores[0];
  player1Score.textContent = scores[1];
  activePlayer = activePlayer === 1 ? 0 : 0;
  playing = true;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

document.querySelector('.btn--new').addEventListener('click', init);
