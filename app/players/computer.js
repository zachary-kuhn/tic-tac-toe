module.exports = function ($q, _, ComputerStrategy, Player) {
  function ComputerPlayer(token, board, opponentToken) {
    Player.call(this, token);

    this.board = board;
    this.strategy = new ComputerStrategy(board, token, opponentToken);
    this.opponent = null;
    this.victoryText = 'You lost :(';
  }

  ComputerPlayer.prototype = Object.create(Player.prototype);

  ComputerPlayer.prototype.giveTurn = function (turn) {
    turn.resolve(this.strategy.execute());
  };

  ComputerPlayer.prototype.setOpponent = function (opponent) {
    this.opponent = opponent;

    this.opponent.getTurn().then(_.noop, _.noop, function (cell) {
      this.doTurn(this.strategy.execute());
    }.bind(this));
  };

  return ComputerPlayer;
};
