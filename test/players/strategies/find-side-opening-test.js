describe('FindSideOpening', function () {
  var _, Board, Cell, X, O, EMPTY, strategy;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (FindSideOpening, ___, _Board_, _Cell_, Players) {
    strategy = new FindSideOpening();
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

  it('should return an empty array when all sides are taken', function () {
    var board = new Board(_.map([[EMPTY, X, EMPTY],
                                 [X, EMPTY, O],
                                 [EMPTY, O, EMPTY]],
                                toCell));

    expect(strategy(board)).to.have.length(0);
  });

  it('should return an array with three elements when three are open', function () {
    var board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [X, EMPTY, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toCell));

    expect(strategy(board)).to.have.length(3);
  });

  it('should return an array with two elements when two are open', function () {
    var board = new Board(_.map([[EMPTY, X, EMPTY],
                                 [EMPTY, EMPTY, EMPTY],
                                 [EMPTY, O, EMPTY]],
                                toCell));

    expect(strategy(board)).to.have.length(2);
  });

  it('should return an array with one element when one is open', function () {
    var board = new Board(_.map([[EMPTY, X, EMPTY],
                                 [X, EMPTY, O],
                                 [EMPTY, EMPTY, EMPTY]],
                                toCell));

    expect(strategy(board)).to.have.length(1);
  });
});
