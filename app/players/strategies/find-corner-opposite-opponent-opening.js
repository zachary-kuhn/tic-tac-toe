module.exports = function (_, Players) {
  return function () {
    return function (board) {
      function hasOpponentCorner(cell) {
        return board.isCorner(cell) && cell.isPlayer(Players.X)
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
