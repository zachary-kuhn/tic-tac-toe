describe('FindNonForkableOpening', function () {
  var _, Board, Cell, X, O, EMPTY, strategy;

  beforeEach(module('ticTacToe'));

  function toCell(row) {
    return _.map(row, function (token) {
      if (token instanceof Cell) {
        return token;
      } else {
        return new Cell(token);
      }
    });
  }

  describe('for player O', function () {
    beforeEach(inject(function (FindNonForkableOpening, FindCornerOpening, ___, _Board_, _Cell_, Tokens) {
      strategy = new FindNonForkableOpening(Tokens.O, Tokens.X)(new FindCornerOpening());
      _ = ___;
      Board = _Board_;
      Cell = _Cell_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should not return openings that give player X a fork', function () {
      var board = new Board(_.map([[EMPTY, EMPTY, X],
                                   [EMPTY, O, EMPTY],
                                   [X, EMPTY, EMPTY]],
                                  toCell));

      expect(strategy(board)).to.have.length(0);
    });

    it('should return openings that do not give player X a fork', function () {
      var first = new Cell(),
          third = new Cell(),
          board = new Board(_.map([[first, X, third],
                                   [EMPTY, O, EMPTY],
                                   [X, EMPTY, EMPTY]],
                                  toCell));

      expect(strategy(board)).to.have.length(2);
      expect(strategy(board)).to.include.members([first, third]);
    });
  });

  describe('for player X', function () {
    beforeEach(inject(function (FindNonForkableOpening, FindSideOpening, ___, _Board_, _Cell_, Tokens) {
      strategy = new FindNonForkableOpening(Tokens.X, Tokens.O)(new FindSideOpening());
      _ = ___;
      Board = _Board_;
      Cell = _Cell_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should not return openings that give player O a fork unless doing so gives player X a win', function () {
      var second = new Cell(),
          fourth = new Cell(),
          board = new Board(_.map([[EMPTY, second, X],
                                   [fourth, EMPTY, O],
                                   [O, EMPTY, EMPTY]],
                                  toCell));

      expect(strategy(board)).to.have.length(2);
      expect(strategy(board)).to.include.members([second, fourth]);
    });
  });
});
