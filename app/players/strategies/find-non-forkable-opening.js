module.exports = function (_, Players, FindForkOpening, FindWinningOpening) {
  return function (token, opponentToken) {
    var opponentFork = new FindForkOpening(opponentToken),
        win = new FindWinningOpening(token);

    return function (strategy) {
      return function (board) {
        var openings = strategy(board),
            futureOpenings;

        return _.filter(openings, function (opening) {
          opening.mark(token);

          futureOpenings = opponentFork(board);
          futureWin = win(board);

          opening.mark(Players.EMPTY);

          return futureOpenings.length === 0 ||
              _.difference(futureWin, futureOpenings).length > 0;
        });
      };
    };
  };
};
