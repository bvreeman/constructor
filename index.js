// require inquirer
const inquirer = require('inquirer');
const isLetter = require('is-letter');
// require objects/exports
const Word = require('./word.js');
const newWord = require('./game.js');


let guessesRemaining = 10;
let guessedLetters = [];
let chosenWord = newWord.wordList[Math.floor((Math.random() * newWord.wordList.length))];
let chosenWordArray = [];

// function to restart the game after either a loss or a win
function restartGame() {
  guessesRemaining = 10;
  guessedLetters = [];
  inquirer.prompt([{
    name: 'play',
    type: 'confirm',
    message: 'Would you like to play again?',
  }]).then(function(answer) {
    if (answer.play) {
      newGame();
    } else {
      console.log('\nOkay. See you another time!');
    }
  });
}

// This function prompts the user to input a letter and then pushes
// it to the guessedLetters array. It also counts down the guesses
// remaining and ends up restarting the game after a win or loss.

function gamePlay() {
  if (guessesRemaining > 0) {
    inquirer.prompt([{
      name: 'guess',
      type: 'input',
      message: 'What letter would you like to guess?',
      validate: function(value) {
        if (isLetter(value)) {
          return true;
        }
        return false;
      },
    }]).then(function(ltr) {
      if (ltr.guess) {
        guessedLetters.push(ltr.guess.toUpperCase());
        console.log('\n<------------------------------------> \n \n');
        Word(chosenWord);
        // console.log(chosenWord);
        console.log(' \n \n<------------------------------------>');
        console.log(`\n You guessed these letters \n \n${guessedLetters.join(', ')}`);
        guessesRemaining--;
        console.log(`\n You have ${guessesRemaining} guesses remaining`);
        console.log('\n<------------------------------------>\n');
        gamePlay();
      }
    });
  } else {
    console.log('You lose!\n');
    restartGame();
  }
}

// This sets up the game in getting a new random word from my game.js file
// It also pulls in the Word constructor from word.js in order to push
// the dashes into the terminal.

function newGame() {
  console.log(`\n You have ${guessesRemaining} guesses remaining\n`);
  chosenWord = newWord.wordList[Math.floor((Math.random() * newWord.wordList.length))];
  chosenWordArray = chosenWord.split('');
  console.log(chosenWordArray);
  console.log('\n<------------------------------------> \n \n');
  Word(chosenWord);
  console.log('\n<------------------------------------> \n \n');
  if (guessesRemaining > 0) {
    gamePlay();
  } else {
    console.log('You lose\n');
    restartGame();
  }
}

// this is the function that allows the game to start in the first place.
// It prompts the user asking if they want to play or not.

function startGame() {
  console.log('\n');
  inquirer.prompt([{
    name: 'play',
    type: 'confirm',
    message: 'Would you like to play?',
  }]).then(function(answer) {
    if (answer.play) {
      newGame();
    } else {
      console.log('\nOkay. See you another time!');
    }
  });
}

startGame();


// set the maxListener
// require('events').EventEmitter.prototype.maxListeners = 100;


// const hangman = {
//   wordBank: Game.newWord.wordList,
//   guessesRemaining: 10,
//   // empty array to hold letters guessed by user. And checks if the user guessed the letter already
//   guessedLetters: [],
//   currentWord: null,
//   // asks user if they are ready to play
//   startGame: function() {
//     const that = this;
//     // clears guessedLetters before a new game starts if it's not already empty.
//     if (this.guessedLetters.length > 0) {
//       this.guessedLetters = [];
//     }
//   },
//   // if they want to play starts new game.
//   newGame: function() {
//     if (this.guessesRemaining === 10) {
//       console.log('Okay! Here we go!');
//       console.log('*****************');
//       // generates random number based on the wordBank
//       const randNum = Math.floor(Math.random() * this.wordBank.length);
//       this.currentWord = new Word(this.wordBank[randNum]);
//       this.currentWord.getLets();
//       // displays current word as blanks.
//       console.log(this.currentWord.wordRender());
//       this.keepPromptingUser();
//     } else {
//       this.resetGuessesRemaining();
//       this.newGame();
//     }
//   },
//   resetGuessesRemaining: function() {
//     this.guessesRemaining = 10;
//   },
//   keepPromptingUser: function() {
//     const that = this;
//     // asks player for a letter
//     inquirer.prompt([{
//       name: 'chosenLtr',
//       type: 'input',
//       message: 'Choose a letter:',
//       validate: function(value) {
//         if (isLetter(value)) {
//           return true;
//         }
//         return false;
//       },
//     }]).then(function(ltr) {
//       // toUpperCase because words in word bank are all caps
//       const letterReturned = (ltr.chosenLtr).toUpperCase();
//       // adds to the guessedLetters array if it isn't already there
//       let guessedAlready = false;
//       for (let i = 0; i < that.guessedLetters.length; i++) {
//         if (letterReturned === that.guessedLetters[i]) {
//           guessedAlready = true;
//         }
//       }
//       // if the letter wasn't guessed already run through entire function, else reprompt user
//       if (guessedAlready === false) {
//         that.guessedLetters.push(letterReturned);

//         const found = that.currentWord.checkIfLetterFound(letterReturned);
//         // if none were found tell user they were wrong
//         if (found === 0) {
//           console.log('Nope! You guessed wrong.');
//           that.guessesRemaining--;
//           console.log(`Guesses remaining: ${that.guessesRemaining}`);

//           console.log('\n*******************');
//           console.log(that.currentWord.wordRender());
//           console.log('\n*******************');

//           console.log(`Letters guessed: ${that.guessedLetters}`);
//         } else {
//           console.log('Yes! You guessed right!');
//           // checks to see if user won
//           if (that.currentWord.didWeFindTheWord() === true) {
//             console.log(that.currentWord.wordRender());
//             console.log('Congratulations! You won the game!!!');
//             // that.startGame();
//           } else {
//             // display the user how many guesses remaining
//             console.log(`Guesses remaining: ${that.guessesRemaining}`);
//             console.log(that.currentWord.wordRender());
//             console.log('\n*******************');
//             console.log(`Letters guessed: ${that.guessedLetters}`);
//           }
//         }
//         if (that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
//           that.keepPromptingUser();
//         } else if (that.guessesRemaining === 0) {
//           console.log('Game over!');
//           console.log(`The word you were guessing was: ${that.currentWord.word}`);
//         }
//       } else {
//         console.log("You've guessed that letter already. Try again.");
//         that.keepPromptingUser();
//       }
//     });
//   },
// };

// hangman.startGame();
