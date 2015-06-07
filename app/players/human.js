'use strict';

module.exports = /* @ngInject */ function (Player) {
  function HumanPlayer(token) {
    Player.call(this, token);
  }

  HumanPlayer.prototype = Object.create(Player.prototype);

  HumanPlayer.prototype.giveTurn = function (turn) {
    this.turn = turn;
  };

  HumanPlayer.prototype.doTurn = function (cell) {
    if (cell.isEmpty()) {
      this.turn.resolve(cell);
    }
  };

  return HumanPlayer;
};
