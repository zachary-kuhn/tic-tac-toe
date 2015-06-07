describe('FindCenterOpening', function () {
  var _, Board, Square, X, O, EMPTY, strategy;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (FindCenterOpening, ___, _Board_, _Square_, Tokens) {
    strategy = new FindCenterOpening();
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

  it('should return an empty list when the center square is taken by X', function () {
    var board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [EMPTY, X, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toSquare));

    expect(strategy(board)).to.eql([]);
  });

  it('should return an empty list when the center square is taken by O', function () {
    var board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [EMPTY, O, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toSquare));

    expect(strategy(board)).to.eql([]);
  });

  it('should return an array with the center when it is empty', function () {
    var center = new Square(EMPTY),
        board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [EMPTY, center, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toSquare));

    expect(strategy(board)).to.eql([center]);
  });
});
