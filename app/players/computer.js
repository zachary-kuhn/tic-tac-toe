module.exports = function ($q, _, ComputerStrategy) {
  return function (player, board) {
    this.player = player;
    this.board = board;
    this.strategy = new ComputerStrategy(this.board);
    this.opponent = null;
    this.turn = $q.defer();
    this.victoryText = 'You lost :(';

    this.doTurn = function (cell) {
      if (cell && cell.isEmpty()) {
        return this.turn.notify(cell.mark(this.player));
      }
    };

    this.getTurn = function () {
      return this.turn.promise;
    };

    this.setOpponent = function (opponent) {
      this.opponent = opponent;

      this.opponent.getTurn().then(_.noop, _.noop, function (cell) {
        this.doTurn(this.strategy.execute());
      }.bind(this));
    };
  };
};
