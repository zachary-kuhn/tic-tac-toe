module.exports = function (_,
  FindWinningOpening, FindForkOpening, FindCenterOpening,
  FindCornerOppositeOpponentOpening, FindCornerOpening,
  FindSideOpening, FindNonForkableOpening) {
  return function (board, token, opponentToken) {
    var nonForkable = new FindNonForkableOpening(token, opponentToken);
    /*
     * Our strategy marks our token in the following order:
     *
     * 1. a space that will win the game
     * 2. a space that will lose the game for us
     * 3. a space that will create a fork for us
     *
     * The next few choices are decided in order based on whether choosing that
     * opening will create a fork for the opponent.
     *
     * 4. the center
     * 5. the corner opposite an opponent's token
     * 6. any corner
     * 7. any side
     */
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
