module.exports = function (_, Players, ConditionBuilder) {
  return function (player) {
    /*
     * A winning opening is any triple on the board with two of the player and
     * one empty cell.
     */
    return function (board) {
      return _(board.getAllTriples()).filter(
          new ConditionBuilder().has(2).of(player).and().has(1).of(Players.EMPTY)
        )
        .flatten().filter(_.method('isEmpty')).value();
    };
  };
};
