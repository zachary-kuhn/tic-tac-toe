var _ = require('lodash');

var EMPTY = '.',
    X = 'X',
    O = 'O',
    Rows = {
      TOP: 0,
      MIDDLE: 1,
      BOTTOM: 2
    },

    Cols = {
      LEFT: 0,
      CENTER: 1,
      RIGHT: 2
    },

    slots = [[EMPTY, EMPTY, EMPTY],
             [EMPTY, EMPTY, EMPTY],
             [EMPTY, EMPTY, EMPTY]];

slots = [{
  row: TOP,
  col: LEFT,
  val: EMPTY
}, {
  row: TOP,
  col: CENTER,
  val: EMPTY
}, {
  row: TOP,
  col: RIGHT,
  val: EMPTY
}, {
  row: MIDDLE,
  col: LEFT,
  val: EMPTY
}, {
  row: MIDDLE,
  col: CENTER,
  val: EMPTY
}, {
  row: MIDDLE,
  col: RIGHT,
  val: EMPTY
}, {
  row: BOTTOM,
  col: LEFT,
  val: EMPTY
}, {
  row: BOTTOM,
  col: CENTER,
  val: EMPTY
}, {
  row: BOTTOM,
  col: RIGHT,
  val: EMPTY
}];

function getRow(idx) {
  return _.filter(slots, { row: idx });
}

function getCol(idx) {
  return _.filter(slots, { col: idx });
}

function getDownwardDiagonal() {
  return _.filter(slots, function (cell) {
    return cell.row === cell.col
  });
}

function getUpwardDiagonal() {
  return _.filter(slots, function (cell) {
    return cell.row === 2 - cell.col;
  });
}

function getDiagonals() {
  return [getDownwardDiagonal(), getUpwardDiagonal()];
}

function getAllTriples() {
  var rows = _(Rows).values().map(getRow);
  var cols = _(Cols).values().map(getCol);
  var diagonals = getDiagonals();

  return rows.concat(cols).concat(diagonals);
}

function getWinningOpening(player) {
  return _(getAllTriples()).filter(function (triple) {
    return _.filter(triple, { val: player }).length === 2;
  }).map(function (triple) {
    return _.reject(triple, { val: player });
  }).value();
}

function getCenterOpening() {
  return _.find(slots, {
    row: MIDDLE,
    col: CENTER,
    val: EMPTY
  });
}

function getDiagonalOpening() {
  return _(getDiagonals()).find(function (triple) {
    return _.filter(triple, { val: EMPTY }).length === 2;
  }).find(function (triple) {
    return triple.val === EMPTY;
  }).value();
}

function isWon(player) {
  return _.some(getAllTriples(), function (triple) {
    return _.filter(triple, { val: player }).length === 3;
  });
}

function isFull() {
  return !_.some(slots, { val: EMPTY });
}

function doTurn(player, row, col) {
  _.find(slots, { row: row, col: col }).val = player;
}

function computerTurn() {
  var winningOpening = getWinningOpening(O);

  if (winningOpen) {
    doTurn(O, winningOpening.row, winningOpen.col);
  } else {
    var losingOpening = getWinningOpening(X);

    if (losingOpening) {
      doTurn(O, losingOpening.row, losingOpening.col);
    } else {
      var centerOpening = getCenterOpening();

      if (centerOpening) {
        doTurn(O, centerOpening.row, centerOpening.col);
      } else {
        var diagonalOpening = getDiagonalOpening();

        doTurn(O, diagonalOpening.row, diagonalOpening.col);
      }
    }
  }
}
