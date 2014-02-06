var $$ = document.querySelectorAll.bind(document),
  forEach = Array.prototype.forEach;


var Minesweeper = (function() {
  var squareEls, squares;

  function coalesce(index, MPR) {
    console.log('coalesce at index ' + index + ' with MPR ' + MPR );
    var square = squares[index];
    console.debug(square);
    if (!!square && !square.isMine && !square.revealed && square.numAdjMines == 0) {
      square.el.click();
      square.setRevealed(true);
      var neighborIndices = [ index-MPR, index+MPR ];
      if (!isLeftEdge(index, MPR)) {
        neighborIndices = neighborIndices.concat([  index-1, index-MPR-1, index+MPR-1 ]);
      }
      if (!isRightEdge(index, MPR)) {
        neighborIndices = neighborIndices.concat([ index-MPR+1, index+MPR+1, index+1 ]);
      }
      console.debug(neighborIndices);
      forEach.call(neighborIndices, function(neighborIndex) {
        console.log('neighIndex ' + neighborIndex);
        coalesce(neighborIndex, MPR);
      });
    }
  }

  function init() {
    squares = [];
    squareEls = $$('span');
    var i, MPR = 6;

    forEach.call(squareEls, function(squareEl, index) {
      squareEl.classList.remove('square-on');
      squareEl.classList.remove('square-mine');
      squareEl.classList.remove('square-safe');
      var square = new Square(squareEl); // mines per row @TODO: use width

      square.el.addEventListener( 'click', function(e) {
        if (square.revealed) {
          return;
        }
        if (square.isMine) {
          // trigger mine explode
          alert('trigger mine explode');
        } else {
          coalesce(index, MPR);
          console.log('trigger square-safe coalesce');
        }
        square.el.classList.add('square-on');
      });
      squares.push(square);
    });

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

  function reveal() {
    forEach.call(squares, function(square) {
      square.el.classList.add('square-on');
    });
  }

  function validate() {
    console.log('@STUB');
  }

  return {
    init: init,
    reveal: reveal,
    validate: validate
  }

})();

document.addEventListener('DOMContentLoaded', function() {
  Minesweeper.init();
  $$('.reveal')[0].addEventListener('click', function(e){
    Minesweeper.reveal();
  });
  $$('.reset')[0].addEventListener('click', function(e){
    Minesweeper.init();
  });
  $$('.validate')[0].addEventListener('click', function(e){
    Minesweeper.validate();
  });
});