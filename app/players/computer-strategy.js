module.exports = function (_, Players,
  FindWinningOpening, FindForkOpening, FindCenterOpening,
  FindCornerOppositeOpponentOpening, FindCornerOpening,
  FindSideOpening, FindNonForkableOpening) {
  return function (board, token, opponentToken) {
    var nonForkable = new FindNonForkableOpening(token, opponentToken);
    var strategies = [
      new FindWinningOpening(token),
      new FindWinningOpening(opponentToken),
      new FindForkOpening(token),
      nonForkable(new FindCenterOpening()),
      nonForkable(new FindCornerOppositeOpponentOpening()),
      nonForkable(new FindCornerOpening()),
      nonForkable(new FindSideOpening())
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
