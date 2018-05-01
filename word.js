// require letter objects
const Letter = require('./letter.js');

function Word(wrd) {
  this.word = wrd;
  this.lettersOfChosenWordArray = wrd.split('');
  this.foundWord = false;
  this.hiddenWord = [];

  this.getLetters = () => {
    for (const ltr of this.lettersOfChosenWordArray) {
      const letter = new Letter(ltr);
      this.hiddenWord.push(letter.letterRender());
    }
  };

  this.getLetters();
  // console.log(this.hiddenWord);
  const hiddenWordString = this.hiddenWord.toString().replace(/,/g, '');
  console.log(hiddenWordString);

  // checks to see if letter is in the word
  this.checkIfLetterFound = function (guessedLetter) {
    let whatToReturn = 0;

    // iterates through each letter to see if it matches the guessed letter
    this.letters.forEach(function (lttr) {
      if (lttr.letter === guessedLetter) {
        lttr.appear = true;
        whatToReturn++;
      }
    });

    return whatToReturn;
  };

  this.wordRender = function () {
    let display = '';

    this.letters.forEach(function (lttr) {
      const currentLetter = lttr.letterRender();
      display += currentLetter;
    });
    return display;
  };
}

// const word = new Word('Hope it works');

module.exports = Word;
