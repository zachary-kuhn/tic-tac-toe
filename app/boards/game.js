'use strict';

module.exports = /* @ngInject */ function ($q, Board, BoardStatus, Cell,
    Tokens) {
  function Game(players, board, status) {
    this.players = players;

    this.board = board || new Board([[new Cell(), new Cell(), new Cell()],
                                     [new Cell(), new Cell(), new Cell()],
                                     [new Cell(), new Cell(), new Cell()]]);

    this.status = status || new BoardStatus(this.board);
  }

  Game.prototype.nextTurn = function (token) {
    var self = this,
        turn = $q.defer();

    this.players[token].giveTurn(turn, this.board);

    turn.promise.then(function (cell) {
      cell.mark(token);

      if (!self.isFinished()) {
        self.nextTurn(Tokens.getOpponent(token));
      }
    });
  };

  Game.prototype.start = function () {
    this.nextTurn(Tokens.X);
  };

  Game.prototype.isFinished = function () {
    return Boolean(this.status.get());
  };

  Game.prototype.hasNoPlayers = function () {
    return !this.players;
  };

  return Game;
};
