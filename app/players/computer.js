'use strict';

module.exports = /* @ngInject */ function (ComputerStrategy, Player) {
  function ComputerPlayer(token) {
    Player.call(this, token);

    this.strategy = new ComputerStrategy(token);
  }

  ComputerPlayer.prototype = Object.create(Player.prototype);

  ComputerPlayer.prototype.giveTurn = function (turn, board) {
    turn.resolve(this.strategy.execute(board));
  };

  return ComputerPlayer;
};
