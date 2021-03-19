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

// Loop over the chars in `word` and create divs.
//     $('#word-container').append(`<div class="letter-box ${char}"></div>`);

const createDivsForChars = (word) => {
  for (const char of word) {
    // console.log(`test passed! ${char}`); Option to prove this is working
    const div = document.createElement('div');
    div.classList.add('letter-box');
    div.classList.add(char);

    document.querySelector('#word-container').append(div);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//         $('#letter-buttons').append(`<button>${char}</button>`);
const generateLetterButtons = () => {
  for (const letter of ALPHABET) {
    const button = document.createElement('button');
    button.innerHTML = letter; // No need for ${}. 
    // Why? Setting an attribute in DOM; not writing directly to HTML.

    document.querySelector('#letter-buttons').append(button);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//      $(buttonEl).attr('disabled', true);
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.setAttribute('disabled', true);
};

// Return `true` if `letter` is in the word.
//   return $(`div.${letter}`)[0] !== undefined;
const isLetterInWord = (letter) => {
  return document.querySelector(`div.${letter}`) !== null;
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//  $(`div.${letter}`).html(`${letter}`);
const handleCorrectGuess = (letter) => {
  document.querySelector(`div.${letter}`).innerHTML = letter;
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
// 
// $('#shark-img img').attr('src', `/static/images/guess${numWrong}.png`);
// if (numWrong === 5) {
//   $('button').attr('disabled', true);
//   $('#play-again').css('display', '');
// }

const handleWrongGuess = () => {
  numWrong += 1;

  document.querySelector('#shark-img img').setAttribute(
    'src', `/static/images/guess${numWrong}.png`);
  
  if (numWrong === 5) {
    document.querySelector('button').setAttribute('disabled', true);
    document.querySelector('#play-again').style.display = '';
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
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      const clickedBtn = evt.target;
      disableLetterButton(clickedBtn);

      const letter = clickedBtn.innerHTML;

      if (isLetterInWord(letter)) {
        // console.log(`We think letter ${letter} is in the word.`)
        handleCorrectGuess(letter);
      } else {
        handleWrongGuess(letter);
      }
    });
  });

  document.querySelector('#play-again').addEventListener('click', () => {
    resetGame();
  });

})();
