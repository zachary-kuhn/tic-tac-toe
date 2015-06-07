'use strict';

module.exports = /* @ngInject */ function (_) {
  return function (opponent) {
    /*
     * To find a corner opposite the opponent, we look at all diagonals on the
     * board with an opponent in the corner. From that filtered list of
     * diagonals, we then look at all squares for one that is empty and in a
     * corner.
     */
    return function (board) {
      function hasOpponentCorner(square) {
        return board.isCorner(square) && square.isPlayer(opponent);
      }

      function isEmptyCorner(square) {
        return board.isCorner(square) && square.isEmpty();
      }

      return _(board.getDiagonals())
        .filter(_.partial(_.find, _, hasOpponentCorner))
        .flatten()
        .filter(isEmptyCorner)
        .value();
    };
  };
};
