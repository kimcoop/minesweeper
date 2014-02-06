(function(window) {
  function Square(el) {
    // some defaults
    var square = this;
    square.isMine = false;
    square.numAdjMines = -1;
    square.el = el;

    square.isMine  = Math.random() < 0.5;

    if (square.isMine) {
      square.el.classList.add('square-mine');
    } else {
      square.el.classList.add('square-safe');
    }
  }

  // Square.prototype.setIsMine = function(isMine) {
  //   square.isMine = isMine;
  // }
  Square.prototype.setNumAdjMines = function(numAdjMines) {
    this.numAdjMines = numAdjMines;
  }

  Square.prototype.getNumAdjMines = function() {
    return this.numAdjMines;
  }

  window.Square = window.Square || Square;
})(window);