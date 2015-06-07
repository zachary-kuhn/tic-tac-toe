'use strict';

module.exports = /* @ngInject */ function (_, Game, Tokens, HumanPlayer,
    ComputerPlayer) {
  this.Tokens = Tokens;
  this.game = new Game();

  this.choosePlayer = function (token) {
    var opponentToken = Tokens.getOpponent(token),
        players = {};

    players[token] = new HumanPlayer(token);
    players[opponentToken] = new ComputerPlayer(opponentToken);

    this.token = token;
    this.game = new Game(players);

    this.game.start();
  };

  this.isPopoverVisible = function () {
    return this.game.isFinished() || this.game.hasNoPlayers();
  };
};
