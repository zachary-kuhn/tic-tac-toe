'use strict';

module.exports = function (_, Players, HumanPlayer, ComputerPlayer, Board, BoardStatus, Tokens, $q, Cell) {
  this.Players = Players;

  function initBoard() {
    this.board = new Board([[new Cell(), new Cell(), new Cell()],
                             [new Cell(), new Cell(), new Cell()],
                             [new Cell(), new Cell(), new Cell()]]);
    this.boardStatus = new BoardStatus(this.board);
  }

  this.choosePlayer = function (token) {
    this.reset(token);
  };

  this.startTurn = function (token) {
    var turn = $q.defer();

    this.players[token].giveTurn(turn);

    turn.promise.then(function (cell) {
      cell.mark(token);

      if (!this.boardStatus.get()) {
        this.startTurn(Tokens.getOpponent(token));
      }
    });
  };

  this.reset = function (token) {
    var opponentToken = Tokens.getOpponent(token);

    initBoard();
    this.token = token;
    this.players = {};
    this.players[token] = new HumanPlayer(token);
    this.players[opponentToken] = new ComputerPlayer(opponentToken, this.board, token);

    this.startTurn(Players.X);

    this.status = '';
  };

  this.isPopoverVisible = function () {
    return this.boardStatus.get() || !this.token;
  };

  (function init() {
    initBoard();
  }());
};
