'use strict';

module.exports = function (_, Players) {
  return function () {
    /*
     * To find a corner opposite the opponent, we look at all diagonals on the
     * board with an opponent in the corner. From that filtered list of
     * diagonals, we then look at all cells for one that is empty and in a
     * corner.
     */
    return function (board) {
      function hasOpponentCorner(cell) {
        return board.isCorner(cell) && cell.isPlayer(Players.X);
      }

      function isEmptyCorner(cell) {
        return board.isCorner(cell) && cell.isEmpty();
      }

      return _(board.getDiagonals())
        .filter(_.partial(_.find, _, hasOpponentCorner))
        .flatten()
        .filter(isEmptyCorner)
        .value();
    };
  };
};
