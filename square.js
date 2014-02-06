(function(window) {
  function Square(el) {
    // some defaults
    var square = this;
    square.isMine = false;
    square.numAdjMines = -1;
    square.el = el;
    square.revealed = false;

    // square.isMine  = Math.random() < 0.5;
    square.isMine  = Math.random() < 0.3;

    if (square.isMine) {
      square.el.classList.add('square-mine');
    } else {
      square.el.classList.add('square-safe');
    }
  }

  // Square.prototype.setIsMine = function(isMine) {
  //   square.isMine = isMine;
  // }
  Square.prototype.setRevealed = function(revealed) {
    this.revealed = revealed;
    this.el.classList.add('square-on');
  }
  Square.prototype.setNumAdjMines = function(numAdjMines) {
    this.numAdjMines = numAdjMines;
  }

  Square.prototype.getNumAdjMines = function() {
    return this.numAdjMines;
  }

  window.Square = window.Square || Square;
})(window);