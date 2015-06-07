describe('FindForkOpening', function () {
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
    beforeEach(inject(function (FindForkOpening, ___, _Board_, _Square_, Tokens) {
      strategy = new FindForkOpening(Tokens.O);
      _ = ___;
      Board = _Board_;
      Square = _Square_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should return all possible fork openings for O', function () {
      var first = new Square(),
          ninth = new Square(),
          board = new Board(_.map([[first, EMPTY, O],
                                   [EMPTY, X, EMPTY],
                                   [O, EMPTY, ninth]],
                                  toSquare));

      expect(strategy(board)).to.include.members([first, ninth]);
    });
  });

  describe('for player X', function () {
    beforeEach(inject(function (FindForkOpening, ___, _Board_, _Square_, Tokens) {
      strategy = new FindForkOpening(Tokens.X);
      _ = ___;
      Board = _Board_;
      Square = _Square_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should return all possible fork openings for X', function () {
      var seventh = new Square(),
          board = new Board(_.map([[X, EMPTY, EMPTY],
                                   [EMPTY, O, EMPTY],
                                   [seventh, X, EMPTY]],
                                  toSquare));

      expect(strategy(board)).to.include(seventh);
    });
  });
});
