'use strict';

module.exports = function (_, Players, HumanPlayer, ComputerPlayer, Board, BoardStatus, Tokens, $q, Cell) {
  var self = this;

  this.Players = Players;

  function initBoard() {
    self.board = new Board([[new Cell(), new Cell(), new Cell()],
                             [new Cell(), new Cell(), new Cell()],
                             [new Cell(), new Cell(), new Cell()]]);
                             self.boardStatus = new BoardStatus(self.board);
  }

  this.choosePlayer = function (token) {
    self.reset(token);
  };

  this.startTurn = function (token) {
    var turn = $q.defer();

    self.players[token].giveTurn(turn);

    turn.promise.then(function (cell) {
      cell.mark(token);

      if (!self.boardStatus.get()) {
        self.startTurn(Tokens.getOpponent(token));
      }
    });
  };

  this.reset = function (token) {
    var opponentToken = Tokens.getOpponent(token);

    initBoard();
    self.token = token;
    self.players = {};
    self.players[token] = new HumanPlayer(token);
    self.players[opponentToken] = new ComputerPlayer(opponentToken, self.board, token);

    self.startTurn(Players.X);

    self.status = '';
  };

  this.isPopoverVisible = function () {
    return self.boardStatus.get() || !self.token;
  };

  (function init() {
    initBoard();
  }());
};
