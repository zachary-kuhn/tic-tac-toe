describe('FindCenterOpening', function () {
  var _, Board, Cell, X, O, EMPTY, strategy;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (FindCenterOpening, ___, _Board_, _Cell_, Players) {
    strategy = new FindCenterOpening();
    _ = ___;
    Board = _Board_;
    Cell = _Cell_;
    X = Players.X;
    O = Players.O;
    EMPTY = Players.EMPTY;
  }));

  function toCell(row) {
    return _.map(row, function (token) {
      if (token instanceof Cell) {
        return token;
      } else {
        return new Cell(token);
      }
    });
  }

  it('should return an empty list when the center square is taken by X', function () {
    var board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [EMPTY, X, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toCell));

    expect(strategy(board)).to.eql([]);
  });

  it('should return an empty list when the center square is taken by O', function () {
    var board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [EMPTY, O, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toCell));

    expect(strategy(board)).to.eql([]);
  });

  it('should return an array with the center when it is empty', function () {
    var center = new Cell(EMPTY),
        board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [EMPTY, center, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toCell));

    expect(strategy(board)).to.eql([center]);
  });
});
