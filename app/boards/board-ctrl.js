module.exports = function (_, Players, HumanPlayer, ComputerPlayer, Board, BoardStatus, Tokens, $q) {
  var _this = this;

  this.choosePlayer = function (token) {
    _this.reset(token);
  };

  this.startTurn = function (token) {
    var turn = $q.defer();

    _this.players[token].giveTurn(turn);

    turn.promise.then(function (cell) {
      cell.mark(token);

      if (!_this.boardStatus.get()) {
        _this.startTurn(Tokens.getOpponent(token));
      }
    });
  }

  this.reset = function (token) {
    var opponentToken = Tokens.getOpponent(token);

    _this.board = new Board();
    _this.boardStatus = new BoardStatus(_this.board);
    _this.token = token;
    _this.players = {};
    _this.players[token] = new HumanPlayer(token);

    _this.players[opponentToken] = new ComputerPlayer(opponentToken, _this.board, token);

    _this.players[opponentToken].setOpponent(_this.players[token]);

    _this.startTurn(Players.X);

    _this.status = '';
  };

  (function init() {
    _this.reset(Players.X);
  }());
};
