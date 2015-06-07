describe('FindCornerOpening', function () {
  var _, Board, Cell, X, O, EMPTY, strategy;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (FindCornerOpening, ___, _Board_, _Cell_, Players) {
    strategy = new FindCornerOpening();
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

  it('should return an empty array when all corners are taken', function () {
    var board = new Board(_.map([[X, EMPTY, O],
                                 [EMPTY, EMPTY, EMPTY],
                                 [X, EMPTY, O]],
                                toCell));

    expect(strategy(board)).to.have.length(0);
  });

  it('should return an array with three elements when three are open', function () {
    var board = new Board(_.map([[X, EMPTY, EMPTY],
                                 [EMPTY, EMPTY, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toCell));

    expect(strategy(board)).to.have.length(3);
  });

  it('should return an array with two elements when two are open', function () {
    var board = new Board(_.map([[EMPTY, EMPTY, X],
                                 [EMPTY, EMPTY, EMPTY],
                                 [EMPTY, EMPTY, O]],
                                toCell));

    expect(strategy(board)).to.have.length(2);
  });

  it('should return an array with one element when one is open', function () {
    var board = new Board(_.map([[EMPTY, EMPTY, X],
                                 [EMPTY, EMPTY, EMPTY],
                                 [X, EMPTY, O]],
                                toCell));

    expect(strategy(board)).to.have.length(1);
  });
});
