describe('FindSideOpening', function () {
  var _, Board, Square, X, O, EMPTY, strategy;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (FindSideOpening, ___, _Board_, _Square_, Tokens) {
    strategy = new FindSideOpening();
    _ = ___;
    Board = _Board_;
    Square = _Square_;
    X = Tokens.X;
    O = Tokens.O;
    EMPTY = Tokens.EMPTY;
  }));

  function toSquare(row) {
    return _.map(row, function (token) {
      if (token instanceof Square) {
        return token;
      } else {
        return new Square(token);
      }
    });
  }

  it('should return an empty array when all sides are taken', function () {
    var board = new Board(_.map([[EMPTY, X, EMPTY],
                                 [X, EMPTY, O],
                                 [EMPTY, O, EMPTY]],
                                toSquare));

    expect(strategy(board)).to.have.length(0);
  });

  it('should return an array with three elements when three are open', function () {
    var board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [X, EMPTY, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toSquare));

    expect(strategy(board)).to.have.length(3);
  });

  it('should return an array with two elements when two are open', function () {
    var board = new Board(_.map([[EMPTY, X, EMPTY],
                                 [EMPTY, EMPTY, EMPTY],
                                 [EMPTY, O, EMPTY]],
                                toSquare));

    expect(strategy(board)).to.have.length(2);
  });

  it('should return an array with one element when one is open', function () {
    var board = new Board(_.map([[EMPTY, X, EMPTY],
                                 [X, EMPTY, O],
                                 [EMPTY, EMPTY, EMPTY]],
                                toSquare));

    expect(strategy(board)).to.have.length(1);
  });
});
