module.exports = function (_, Players,
  FindWinningOpening, FindForkOpening, FindCenterOpening,
  FindCornerOppositeOpponentOpening, FindCornerOpening,
  FindSideOpening, FindNonForkableOpening) {
  return function (board) {
    var strategies = [
      new FindWinningOpening(Players.O),
      new FindWinningOpening(Players.X),
      new FindForkOpening(Players.O),
      new FindNonForkableOpening(new FindCenterOpening()),
      new FindNonForkableOpening(new FindCornerOppositeOpponentOpening()),
      new FindNonForkableOpening(new FindCornerOpening()),
      new FindSideOpening()
    ];

    this.execute = function () {
      return _(strategies).map(function (strategy) {
          return _.first(strategy(board));
        })
        .compact()
        .first();
    };
  };
};
