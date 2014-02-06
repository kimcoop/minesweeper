var $$ = document.querySelectorAll.bind(document),
  forEach = Array.prototype.forEach;


var Minesweeper = (function() {
  var squareEls, squares;

  function init() {
    squares = [];
    squareEls = $$('span');

    forEach.call(squareEls, function(squareEl) {
      var square = new Square(squareEl);
      square.el.addEventListener( 'click', function(e) {
        if (square.el.classList.contains('square-on')) {
          return;
        }
        if (square.isMine) {
          // trigger mine explode
          alert('trigger mine explode');
        } else {
          console.log('trigger square-safe coalesce');
        }
        square.el.classList.add('square-on');
      });
      squares.push(square);
    });

    var i, MPR = 6; // mines per row @TODO: use width
    for(i = 0; i < squares.length; i++) {
      var adjMines = 0, square = squares[i];
      if (square.isMine) {
        continue;
      }
      if (!isLeftEdge(i, MPR) && !!squares[i-1] && squares[i-1].isMine) {
        adjMines++;
      }
      if (!isLeftEdge(i, MPR) && !!squares[i-MPR-1] && squares[i-MPR-1].isMine) {
        adjMines++;
      }
      if (!!squares[i-MPR] && squares[i-MPR].isMine) {
        adjMines++;
      }
      if (!isRightEdge(i, MPR) && !!squares[i-MPR+1] && squares[i-MPR+1].isMine) {
        adjMines++;
      }
      if (!isRightEdge(i, MPR) && !!squares[i+1] && squares[i+1].isMine) {
        adjMines++;
      }
      if (!isRightEdge(i, MPR) && !!squares[i+MPR+1] && squares[i+MPR+1].isMine) {
        adjMines++;
      }
      if (!!squares[i+MPR] && squares[i+MPR].isMine) {
        adjMines++;
      }
      if (!isLeftEdge(i, MPR) && !!squares[i+MPR-1] && squares[i+MPR-1].isMine) {
        adjMines++;
      }
      square.setNumAdjMines(adjMines);
      square.el.setAttribute('data-mines', adjMines);
    }
  } // init

  function isLeftEdge(index, MPR) {
    return index % MPR == 0;
  }

  function isRightEdge(index, MPR) {
    return index % MPR == MPR - 1;
  }

  return {
    init: init
  }

})();

document.addEventListener('DOMContentLoaded', function() {
  Minesweeper.init();
});