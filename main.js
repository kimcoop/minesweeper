var $$ = document.querySelectorAll.bind(document),
  forEach = Array.prototype.forEach;


var Minesweeper = (function() {
  var squareEls, squares;

  function coalesce(index, SPR) {
    console.log('coalesce at index ' + index + ' with SPR ' + SPR );
    var square = squares[index];
    if (!!square && !square.isMine) {
      console.debug(square);
      // square.el.click();
      square.setRevealed(true);
      if (square.numAdjMines != 0) {
        return;
      }
      var neighborIndices = [ index-SPR, index+SPR ];
      if (!isLeftEdge(index, SPR)) {
        neighborIndices = neighborIndices.concat([  index-1, index-SPR-1, index+SPR-1 ]);
      }
      if (!isRightEdge(index, SPR)) {
        neighborIndices = neighborIndices.concat([ index-SPR+1, index+SPR+1, index+1 ]);
      }
      forEach.call(neighborIndices, function(neighborIndex) {
          coalesce(neighborIndex, SPR);
      });
    }
  }

  function init() {
    squares = [];
    squareEls = $$('span');
    var i, SPR = 6; // mines per row @TODO: use width

    forEach.call(squareEls, function(squareEl, index) {
      squareEl.classList.remove('square-on');
      squareEl.classList.remove('square-mine');
      squareEl.classList.remove('square-safe');
      var square = new Square(squareEl); 

      square.el.addEventListener( 'click', function(e) {
        if (square.revealed) {
          return;
        }
        square.setRevealed(true);
        if (square.isMine) {
          // @TODO trigger mine explode
          alert('trigger mine explode');
        } else {
          coalesce(index, SPR);
        }
      });
      squares.push(square);
    });

    for(i = 0; i < squares.length; i++) {
      var adjMines = 0, square = squares[i];
      if (square.isMine) {
        continue;
      }
      if (!isLeftEdge(i, SPR) && !!squares[i-1] && squares[i-1].isMine) {
        adjMines++;
      }
      if (!isLeftEdge(i, SPR) && !!squares[i-SPR-1] && squares[i-SPR-1].isMine) {
        adjMines++;
      }
      if (!!squares[i-SPR] && squares[i-SPR].isMine) {
        adjMines++;
      }
      if (!isRightEdge(i, SPR) && !!squares[i-SPR+1] && squares[i-SPR+1].isMine) {
        adjMines++;
      }
      if (!isRightEdge(i, SPR) && !!squares[i+1] && squares[i+1].isMine) {
        adjMines++;
      }
      if (!isRightEdge(i, SPR) && !!squares[i+SPR+1] && squares[i+SPR+1].isMine) {
        adjMines++;
      }
      if (!!squares[i+SPR] && squares[i+SPR].isMine) {
        adjMines++;
      }
      if (!isLeftEdge(i, SPR) && !!squares[i+SPR-1] && squares[i+SPR-1].isMine) {
        adjMines++;
      }
      square.setNumAdjMines(adjMines);
      square.el.setAttribute('data-mines', adjMines);
    }
  } // init

  function isLeftEdge(index, SPR) {
    return index % SPR == 0;
  }

  function isRightEdge(index, SPR) {
    return index % SPR == SPR - 1;
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