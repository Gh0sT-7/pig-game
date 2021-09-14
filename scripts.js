'use strict';

// Selecting elements.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
};

const init = function () {
    // Starting conditions - everything set to zero and no dice on the board.
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.add('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player1El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling the dice functionality.
btnRoll.addEventListener('click', function () {
    if (playing) {
        // Generate random dice roll.
        const dice = Math.trunc(Math.random() * 6) + 1;

        // Display the dice on the board.
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // Checking to see if the dice rolled is a 1. If it is, the other player.
        if (dice !== 1) {
            // Add dice to the current score.
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // If a 1 is rolled or the player pressed hold, then switch to the other player.
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to active player's score.
        // Same as scores[0] + currentScore, scores[1] + currentScore
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // Check to see is player's score is >=100, if it is, the game finishes.
        if (scores[activePlayer] >= 100) {
            playing = false;
            // Finish the game.
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');

            diceEl.classList.add('hidden');
            displayMessage('🎉 Winner!');
        } else {
            // Switch to the next player.
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
