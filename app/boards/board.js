'use strict';

module.exports = /* @ngInject */ function (_, Rows, Columns) {
  var TOP = Rows.TOP,
      MIDDLE = Rows.MIDDLE,
      BOTTOM = Rows.BOTTOM,

      LEFT = Columns.LEFT,
      CENTER = Columns.CENTER,
      RIGHT = Columns.RIGHT;

  function Board(squares) {
    this.squares = squares;
  }

  Board.prototype.getAllTriples = function () {
    var rows = this.squares;
    var cols = _.spread(_.zip)(this.squares);
    var diagonals = this.getDiagonals();

    return rows.concat(cols).concat(diagonals);
  };

  Board.prototype.getDiagonals = function () {
    return [this.getDownwardDiagonal(), this.getUpwardDiagonal()];
  };

  Board.prototype.getDownwardDiagonal = function () {
    return [this.squares[TOP][LEFT], this.squares[MIDDLE][CENTER], this.squares[BOTTOM][RIGHT]];
  };

  Board.prototype.getUpwardDiagonal = function () {
    return [this.squares[TOP][RIGHT], this.squares[MIDDLE][CENTER], this.squares[BOTTOM][LEFT]];
  };

  Board.prototype.getCenter = function () {
    return [this.squares[MIDDLE][CENTER]];
  };

  Board.prototype.isCorner = function (square) {
    return _.contains(this.getCorners(), square);
  };

  Board.prototype.getCorners = function () {
    return [this.squares[TOP][LEFT], this.squares[TOP][RIGHT],
            this.squares[BOTTOM][LEFT], this.squares[BOTTOM][RIGHT]];
  };

  Board.prototype.isSide = function (square) {
    return _.contains(this.getSides(), square);
  };

  Board.prototype.getSides = function () {
    return [this.squares[TOP][CENTER], this.squares[MIDDLE][LEFT],
            this.squares[MIDDLE][RIGHT], this.squares[BOTTOM][CENTER]];
  };

  return Board;
};
