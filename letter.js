const Letter = function(ltr) {
  this.letter = ltr;
  this.appear = false;

  this.letterRender = function() {
    if (this.letter === ' ') {
      this.appear = true;
      return '  ';
    } if (this.appear === false) {
      return ' _ ';
    }
    return this.letter;
  };
  this.letterRender();
};

// const letter = new Letter(' ');
// console.log(letter.letterRender());
module.exports = Letter;
