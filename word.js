// require letter objects
const Letter = require('./letter.js');

const wordBank = ['SPIDER', 'FISH', 'ANT', 'CROCODILE'];
const chosenWord = wordBank[Math.floor((Math.random() * wordBank.length))];
// const remainingLetters = chosenWord.length;


// console.log(chosenWord);
// const chosenWordLength = chosenWord.length;

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

  // this.correctGuess = () => {
  //     const eventLocations = [];
  //     for (let i = 0; i < hiddenWordString.length; i++) {
  //       if (chosenWordLetters[i] === guess) {
  //         eventLocations.push(i);
  //         remainingLetters--;
  //       }
  //       if (remainingLetters === 0) {
  //         console.log('You Win!');
  //       }
  //     }
  //     for (let i = 0; i < eventLocations.length; i++) {
  //       dashWordLength[eventLocations[i]] = guess;
  //     }
  //   }
}

// const word = new Word('Hope it works');

module.exports = Word;

// function Word(wrd) {
//   const that = this;
//   // store the string wrd
//   this.word = wrd;
//   // collection of letter objects
//   this.letters = [];
//   this.wordFound = false;

//   this.getLets = function() {
//     // populate the collection above with new Letter objects
//     for (let i = 0; i < that.word.length; i++) {
//       const newLetter = new Letter(that.word[i]);
//       this.letters.push(newLetter);
//     }
//   };

//   // found the current word
//   this.didWeFindTheWord = function() {
//     if (this.letters.every(function(lttr) {
//       return lttr.appear === true;
//     })) {
//       this.wordFound = true;
//       return true;
//     }
//   };

//   this.checkIfLetterFound = function(guessedLetter) {
//     let whatToReturn = 0;
//     // iterates through each letter to see if it matches the guessed letter
//     this.letters.forEach(function(lttr) {
//       if (lttr.letter === guessedLetter) {
//         lttr.appear = true;
//         whatToReturn++;
//       }
//     });
//     // if guessLetter matches Letter property, the letter object should be shown
//     return whatToReturn;
//   };

//   this.wordRender = function() {
//     let display = '';
//     // render the word based on if letters are found or not
//     that.letters.forEach(function(lttr) {
//       const currentLetter = lttr.letterRender();
//       display += currentLetter;
//     });

//     return display;
//   };
// }

