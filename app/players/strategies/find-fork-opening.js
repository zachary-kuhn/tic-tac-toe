module.exports = function (_, Players, ConditionBuilder) {
  return function (player) {
    /*
     * A fork is any place where it creates an opportunity for the player to win
     * in one of two ways. Because of this, an opponent cannot block both,
     * guaranteeing a win the following turn.
     *
     * How we find a fork is to look at all possible three-in-a-row's on the
     * board, filter down to those who consist of 1 of the player's tokens and
     * two empty spaces, and then find any empty cell that shows up in that list
     * twice.
     */
    return function (board) {
      return _(board.getAllTriples())
        .filter(
          new ConditionBuilder().has(1).of(player).and().has(2).of(Players.EMPTY)
        )
        .flatten()
        .groupBy('id')
        .filter({ length: 2 })
        .map(_.first)
        .filter(_.method('isEmpty'))
        .value();
    };
  }
};
