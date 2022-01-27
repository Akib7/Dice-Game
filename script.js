'use strict';

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let player0Name = document.getElementById('name--0').textContent;
let player1Name = document.getElementById('name--1').textContent;

let scores, currentScore, activePlayer, playing;

const init = function () {
  document.getElementById('name--0').textContent = player0Name;
  document.getElementById('name--1').textContent = player1Name;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceElement.classList.add('hidden');

  current0Element.textContent = 0;
  current1Element.textContent = 0;
  playing = true;

  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
};
init();

const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

score0Element.textContent = 0;
score1Element.textContent = 0;

diceElement.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceElement.classList.remove('hidden');
    const _random = Math.trunc(Math.random() * 6) + 1;
    diceElement.src = `dice-${_random}.png`;

    if (_random !== 1) {
      //Add to current score
      currentScore += _random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // showCurrentScore1.textContent = currentScore;
    } else {
      //Switch to next player
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to active player's score.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if player gets to 100 points, if yes, then player wins.
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
      document.getElementById(`name--${activePlayer}`).textContent =
        '🎉 Winner';
    } else {
      //Switch the players.
      switchPlayers();
    }
  }
});

btnNew.addEventListener('click', init);
