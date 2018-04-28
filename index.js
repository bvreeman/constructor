// require inquirer
const inquirer = require('inquirer');
const isLetter = require('is-letter');
// require objects/exports
const Word = require('./word.js');
const Game = require('./game.js');

// set the maxListener
require('events').EventEmitter.prototype.maxListeners = 100;


const hangman = {
  wordBank: Game.newWord.wordList,
  guessesRemaining: 10,
  // empty array to hold letters guessed by user. And checks if the user guessed the letter already
  guessedLetters: [],
  currentWord: null,
  // asks user if they are ready to play
  startGame: function() {
    const that = this;
    // clears guessedLetters before a new game starts if it's not already empty.
    if (this.guessedLetters.length > 0) {
      this.guessedLetters = [];
    }

    inquirer.prompt([{
      name: 'play',
      type: 'confirm',
      message: 'Ready to play?',
    }]).then(function(answer) {
      if (answer.play) {
        that.newGame();
      } else {
        console.log("Fine, I didn't want to play anyway..");
      }
    });
  },
  // if they want to play starts new game.
  newGame: function() {
    if (this.guessesRemaining === 10) {
      console.log('Okay! Here we go!');
      console.log('*****************');
      // generates random number based on the wordBank
      const randNum = Math.floor(Math.random() * this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNum]);
      this.currentWord.getLets();
      // displays current word as blanks.
      console.log(this.currentWord.wordRender());
      this.keepPromptingUser();
    } else {
      this.resetGuessesRemaining();
      this.newGame();
    }
  },
  resetGuessesRemaining: function() {
    this.guessesRemaining = 10;
  },
  keepPromptingUser: function() {
    const that = this;
    // asks player for a letter
    inquirer.prompt([{
      name: 'chosenLtr',
      type: 'input',
      message: 'Choose a letter:',
      validate: function(value) {
        if (isLetter(value)) {
          return true;
        }
        return false;
      },
    }]).then(function(ltr) {
      // toUpperCase because words in word bank are all caps
      const letterReturned = (ltr.chosenLtr).toUpperCase();
      // adds to the guessedLetters array if it isn't already there
      let guessedAlready = false;
      for (let i = 0; i < that.guessedLetters.length; i++) {
        if (letterReturned === that.guessedLetters[i]) {
          guessedAlready = true;
        }
      }
      // if the letter wasn't guessed already run through entire function, else reprompt user
      if (guessedAlready === false) {
        that.guessedLetters.push(letterReturned);

        const found = that.currentWord.checkIfLetterFound(letterReturned);
        // if none were found tell user they were wrong
        if (found === 0) {
          console.log('Nope! You guessed wrong.');
          that.guessesRemaining--;
          console.log(`Guesses remaining: ${that.guessesRemaining}`);

          console.log('\n*******************');
          console.log(that.currentWord.wordRender());
          console.log('\n*******************');

          console.log(`Letters guessed: ${that.guessedLetters}`);
        } else {
          console.log('Yes! You guessed right!');
          // checks to see if user won
          if (that.currentWord.didWeFindTheWord() === true) {
            console.log(that.currentWord.wordRender());
            console.log('Congratulations! You won the game!!!');
            // that.startGame();
          } else {
            // display the user how many guesses remaining
            console.log(`Guesses remaining: ${that.guessesRemaining}`);
            console.log(that.currentWord.wordRender());
            console.log('\n*******************');
            console.log(`Letters guessed: ${that.guessedLetters}`);
          }
        }
        if (that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
          that.keepPromptingUser();
        } else if (that.guessesRemaining === 0) {
          console.log('Game over!');
          console.log(`The word you were guessing was: ${that.currentWord.word}`);
        }
      } else {
        console.log("You've guessed that letter already. Try again.");
        that.keepPromptingUser();
      }
    });
  },
};

hangman.startGame();
