describe('FindCornerOpening', function () {
  var _, Board, Square, X, O, EMPTY, strategy;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (FindCornerOpening, ___, _Board_, _Square_, Tokens) {
    strategy = new FindCornerOpening();
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

  it('should return an empty array when all corners are taken', function () {
    var board = new Board(_.map([[X, EMPTY, O],
                                 [EMPTY, EMPTY, EMPTY],
                                 [X, EMPTY, O]],
                                toSquare));

    expect(strategy(board)).to.have.length(0);
  });

  it('should return an array with three elements when three are open', function () {
    var board = new Board(_.map([[X, EMPTY, EMPTY],
                                 [EMPTY, EMPTY, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toSquare));

    expect(strategy(board)).to.have.length(3);
  });

  it('should return an array with two elements when two are open', function () {
    var board = new Board(_.map([[EMPTY, EMPTY, X],
                                 [EMPTY, EMPTY, EMPTY],
                                 [EMPTY, EMPTY, O]],
                                toSquare));

    expect(strategy(board)).to.have.length(2);
  });

  it('should return an array with one element when one is open', function () {
    var board = new Board(_.map([[EMPTY, EMPTY, X],
                                 [EMPTY, EMPTY, EMPTY],
                                 [X, EMPTY, O]],
                                toSquare));

    expect(strategy(board)).to.have.length(1);
  });
});
