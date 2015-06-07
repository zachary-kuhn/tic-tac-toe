'use strict';

module.exports = function (ComputerStrategy, Player) {
  function ComputerPlayer(token, board, opponentToken) {
    Player.call(this, token);

    this.board = board;
    this.strategy = new ComputerStrategy(board, token, opponentToken);
  }

  ComputerPlayer.prototype = Object.create(Player.prototype);

  ComputerPlayer.prototype.giveTurn = function (turn) {
    turn.resolve(this.strategy.execute());
  };

  return ComputerPlayer;
};
