module.exports = function (_, Rows, Columns) {
  var TOP = Rows.TOP,
      MIDDLE = Rows.MIDDLE,
      BOTTOM = Rows.BOTTOM,

      LEFT = Columns.LEFT,
      CENTER = Columns.CENTER,
      RIGHT = Columns.RIGHT;

  function Board(cells) {
    this.cells = cells;
  };

  Board.prototype.getAllTriples = function () {
    var rows = this.cells;
    var cols = _.spread(_.zip)(this.cells);
    var diagonals = this.getDiagonals();

    return rows.concat(cols).concat(diagonals);
  };

  Board.prototype.getDiagonals = function () {
    return [this.getDownwardDiagonal(), this.getUpwardDiagonal()];
  };

  Board.prototype.getDownwardDiagonal = function () {
    return [this.cells[TOP][LEFT], this.cells[MIDDLE][CENTER], this.cells[BOTTOM][RIGHT]];
  };

  Board.prototype.getUpwardDiagonal = function () {
    return [this.cells[TOP][RIGHT], this.cells[MIDDLE][CENTER], this.cells[BOTTOM][LEFT]];
  };

  Board.prototype.getCenter = function () {
    return [this.cells[MIDDLE][CENTER]];
  };

  Board.prototype.isCorner = function (cell) {
    return _.contains(this.getCorners(), cell);
  };

  Board.prototype.getCorners = function () {
    return [this.cells[TOP][LEFT], this.cells[TOP][RIGHT],
            this.cells[BOTTOM][LEFT], this.cells[BOTTOM][RIGHT]];
  };

  Board.prototype.isSide = function (cell) {
    return _.contains(this.getSides(), cell);
  };

  Board.prototype.getSides = function () {
    return [this.cells[TOP][CENTER], this.cells[MIDDLE][LEFT],
            this.cells[MIDDLE][RIGHT], this.cells[BOTTOM][CENTER]];
  };

  return Board;
};
