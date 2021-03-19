'use strict';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

console.log("Loaded Sharkwords.js");
// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  for (const char of word) {
    // console.log(char); Option to prove this is working
    // letter-box char is because we're adding two classes to the div
    // we're both calling it a letter-box class 
    // and adding its own letter as a separate class.
    $('#word-container').append(`<div class="letter-box ${char}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  for (const char of ALPHABET) {
  $('#letter-buttons').append(`<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  const button = $(buttonEl);  // Now `button` is a jQuery object!
  button.attr('disabled', true);
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  console.log($(`div.${letter}`)[0] !== undefined); // REMOVE ME LATER
  return ($(`div.${letter}`)[0] !== undefined);
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  $(`div.${letter}`).html(`${letter}`);
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  numWrong += 1;

  if (numWrong > 5) {
    console.log('Play Again prompt');
    // Disable all buttons. No . or # selects ALL elements of type "button"
    $('button').attr('disabled', true);

    // Show the hidden <a> element
    $('#play-again').css('display', '');
  }
  else {
    $('#shark-img img').attr('src', `/static/images/guess${numWrong}.png`);
  }
};

//  Reset game state. Called before restarting the game.
//
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'sean';

  createDivsForChars(word);
  generateLetterButtons();

  $('button').on('click', (evt) => {
    const clickedBtn = $(evt.target);
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();

    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
  });
})();
