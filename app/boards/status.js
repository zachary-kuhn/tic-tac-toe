module.exports = function (_) {
  function BoardStatus(board) {
    this.board = board;
  };

  BoardStatus.prototype.get = function (player, token) {
    if (this.isWon(token)) {
      return player.victoryText;
    } else if (this.isTie()) {
      return 'Tie!';
    } else {
      return '';
    }
  };

  BoardStatus.prototype.isWon = function (player) {
    return _.some(this.board.getAllTriples(), _.partial(_.all, _, _.method('isPlayer', player)));
  };

  BoardStatus.prototype.isTie = function () {
    return !_(this.board.cells).flatten().some(_.method('isEmpty'));
  };

  return BoardStatus;
};
