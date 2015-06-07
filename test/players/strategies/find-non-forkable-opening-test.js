describe('FindNonForkableOpening', function () {
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
    beforeEach(inject(function (FindNonForkableOpening, FindCornerOpening, ___, _Board_, _Square_, Tokens) {
      strategy = new FindNonForkableOpening(Tokens.O, Tokens.X)(new FindCornerOpening());
      _ = ___;
      Board = _Board_;
      Square = _Square_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should not return openings that give player X a fork', function () {
      var board = new Board(_.map([[EMPTY, EMPTY, X],
                                   [EMPTY, O, EMPTY],
                                   [X, EMPTY, EMPTY]],
                                  toSquare));

      expect(strategy(board)).to.have.length(0);
    });

    it('should return openings that do not give player X a fork', function () {
      var first = new Square(),
          third = new Square(),
          board = new Board(_.map([[first, X, third],
                                   [EMPTY, O, EMPTY],
                                   [X, EMPTY, EMPTY]],
                                  toSquare));

      expect(strategy(board)).to.have.length(2);
      expect(strategy(board)).to.include.members([first, third]);
    });
  });

  describe('for player X', function () {
    beforeEach(inject(function (FindNonForkableOpening, FindSideOpening, ___, _Board_, _Square_, Tokens) {
      strategy = new FindNonForkableOpening(Tokens.X, Tokens.O)(new FindSideOpening());
      _ = ___;
      Board = _Board_;
      Square = _Square_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should not return openings that give player O a fork unless doing so gives player X a win', function () {
      var second = new Square(),
          fourth = new Square(),
          board = new Board(_.map([[EMPTY, second, X],
                                   [fourth, EMPTY, O],
                                   [O, EMPTY, EMPTY]],
                                  toSquare));

      expect(strategy(board)).to.have.length(2);
      expect(strategy(board)).to.include.members([second, fourth]);
    });
  });
});
