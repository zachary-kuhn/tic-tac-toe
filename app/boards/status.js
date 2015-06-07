'use strict';

module.exports = function (_, Players) {
  function BoardStatus(board) {
    this.board = board;
  }

  BoardStatus.prototype.get = function () {
    if (this.isWon(Players.X)) {
      return 'Player X won!';
    } else if (this.isWon(Players.O)) {
      return 'Player O won!';
    } else if (this.isTie()) {
      return 'Tie!';
    } else {
      return '';
    }
  };

  BoardStatus.prototype.isWon = function (player) {
    // the board is won when any triple has all of its cells marked by the
    // player
    return _.some(
      this.board.getAllTriples(),
      _.partial(_.all, _, _.method('isPlayer', player)));
  };

  BoardStatus.prototype.isTie = function () {
    // the board is a tie when there are no more empty cells (and technically
    // when no one has won but that is not handled here)
    return !_(this.board.cells).flatten().some(_.method('isEmpty'));
  };

  return BoardStatus;
};
