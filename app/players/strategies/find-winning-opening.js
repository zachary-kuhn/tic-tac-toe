module.exports = function (_, Players, ConditionBuilder) {
  return function (player) {
    return function (board) {
      return _(board.getAllTriples()).filter(
          new ConditionBuilder().has(2).of(player).and().has(1).of(Players.EMPTY)
        )
        .flatten().filter(_.method('isEmpty')).value();
    };
  };
};
