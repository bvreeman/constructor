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
    //   console.log(.guess.toUpperCase());
      if (guessedLetters.includes(ltr.guess.toUpperCase())) {
        console.log('\n<------------------------------------> \n \n');
        Word(chosenWord);
        console.log(' \n \n<------------------------------------>\n');
        console.log(`You guessed ${ltr.guess.toUpperCase()} already.\n`);
        console.log(`\n You have ${guessesRemaining} guesses remaining`);
        console.log('\n<------------------------------------>\n');
        gamePlay();
      } else {
        guessedLetters.push(ltr.guess.toUpperCase());
        console.log('\n<------------------------------------> \n \n');
        Word(chosenWord);
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
