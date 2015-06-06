module.exports = function (_, Players, HumanPlayer, ComputerPlayer, Board, BoardStatus) {
  var _this = this;

  function checkStatus(player, token) {
    _this.status = _this.boardStatus.get(player, token);
  }

  this.reset = function () {
    _this.board = new Board();
    _this.boardStatus = new BoardStatus(_this.board);
    _this.players = {};
    _this.players[Players.X] = new HumanPlayer(Players.X);
    _this.players[Players.O] = new ComputerPlayer(Players.O, _this.board);

    _this.players[Players.O].setOpponent(_this.players[Players.X]);

    _.each(_this.players, function (player, token) {
      player.getTurn().then(_.noop, _.noop, function (cell) {
        checkStatus(player, token);
      });
    })
    _this.status = '';
  };

  (function init() {
    _this.reset();
  }());
};
