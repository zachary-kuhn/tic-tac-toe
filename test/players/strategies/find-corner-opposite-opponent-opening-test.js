describe('FindCornerOppositeOpponentOpening', function () {
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
    beforeEach(inject(function (FindCornerOppositeOpponentOpening, ___, _Board_, _Square_, Tokens) {
      strategy = new FindCornerOppositeOpponentOpening(Tokens.X);
      _ = ___;
      Board = _Board_;
      Square = _Square_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should return an array of corners open opposite from player X', function () {
      var third = new Square(),
          ninth = new Square(),
          board = new Board(_.map([[X, EMPTY, third],
                                   [EMPTY, EMPTY, EMPTY],
                                   [X, EMPTY, ninth]],
                                  toSquare));

      expect(strategy(board)).to.include.members([third, ninth]);
      expect(strategy(board)).to.have.length(2);
    });

    it('should not return corners opposite from O', function () {
      var third = new Square(),
          board = new Board(_.map([[O, EMPTY, third],
                                   [EMPTY, EMPTY, EMPTY],
                                   [X, EMPTY, EMPTY]],
                                  toSquare));

      expect(strategy(board)).to.include(third);
      expect(strategy(board)).to.have.length(1);
    });
  });

  describe('for player X', function () {
    beforeEach(inject(function (FindCornerOppositeOpponentOpening, ___, _Board_, _Square_, Tokens) {
      strategy = new FindCornerOppositeOpponentOpening(Tokens.O);
      _ = ___;
      Board = _Board_;
      Square = _Square_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should return an array of corners open opposite from player O', function () {
      var seventh = new Square(),
          ninth = new Square(),
          board = new Board(_.map([[O, EMPTY, O],
                                   [EMPTY, EMPTY, EMPTY],
                                   [seventh, EMPTY, ninth]],
                                  toSquare));

      expect(strategy(board)).to.include.members([seventh, ninth]);
      expect(strategy(board)).to.have.length(2);
    });

    it('should not return corners opposite from O', function () {
      var first = new Square(),
          board = new Board(_.map([[first, EMPTY, EMPTY],
                                   [EMPTY, EMPTY, EMPTY],
                                   [X, EMPTY, O]],
                                  toSquare));

      expect(strategy(board)).to.include(first);
      expect(strategy(board)).to.have.length(1);
    });
  });
});
