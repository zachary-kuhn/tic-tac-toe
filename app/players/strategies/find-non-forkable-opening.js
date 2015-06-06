module.exports = function (_, Players, FindForkOpening) {
  var opponentFork = new FindForkOpening(Players.X);

  return function (strategy) {
    return function (board) {
      var openings = strategy(board),
          futureOpenings;

      return _.filter(openings, function (opening) {
        opening.mark(Players.O);

        futureOpenings = opponentFork(board);

        opening.mark(Players.EMPTY);

        return futureOpenings.length === 0;
      });
    };
  };
};
