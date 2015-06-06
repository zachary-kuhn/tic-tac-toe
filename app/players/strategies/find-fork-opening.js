module.exports = function (_, Players, ConditionBuilder) {
  return function (player) {
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
