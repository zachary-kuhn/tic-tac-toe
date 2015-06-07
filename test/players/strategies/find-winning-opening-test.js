describe('FindWinningOpening', function () {
  var _, Board, Square, X, O, EMPTY, strategy;

  beforeEach(module('ticTacToe'));

  function toSquare(row) {
    return _.map(row, function (token) {
      if (token instanceof Square) {
        return token;
      } else {
        return new Square(token);
      }
    });
  }

  describe('for player O', function () {
    beforeEach(inject(function (FindWinningOpening, ___, _Board_, _Square_, Tokens) {
      strategy = new FindWinningOpening(Tokens.O);
      _ = ___;
      Board = _Board_;
      Square = _Square_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should return an empty array when there are no winning moves', function () {
      var board = new Board(_.map([[O, EMPTY, EMPTY],
                                   [EMPTY, X, X],
                                   [EMPTY, EMPTY, O]],
                                  toSquare));

      expect(strategy(board)).to.eql([]);
    });

    it('should return an array of all available winning moves', function () {
      var first = new Square(),
          third = new Square(),
          sixth = new Square(),
          board = new Board(_.map([[first, EMPTY, third],
                                   [O, O, sixth],
                                   [O, EMPTY, EMPTY]],
                                  toSquare));

      expect(strategy(board)).to.have.length(3);
      expect(strategy(board)).to.include.members([first, third, sixth]);
    });
  });

  describe('for player X', function () {
    beforeEach(inject(function (FindWinningOpening, ___, _Board_, _Square_, Tokens) {
      strategy = new FindWinningOpening(Tokens.X);
      _ = ___;
      Board = _Board_;
      Square = _Square_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should return an empty array when there are no winning moves', function () {
      var board = new Board(_.map([[O, EMPTY, X],
                                   [EMPTY, X, EMPTY],
                                   [O, EMPTY, EMPTY]],
                                  toSquare));

      expect(strategy(board)).to.eql([]);
    });

    it('should return an array of all available winning moves', function () {
      var third = new Square(),
          board = new Board(_.map([[EMPTY, EMPTY, third],
                                   [O, X, EMPTY],
                                   [X, EMPTY, EMPTY]],
                                  toSquare));

      expect(strategy(board)).to.have.length(1);
      expect(strategy(board)).to.include(third);
    });
  });
});
