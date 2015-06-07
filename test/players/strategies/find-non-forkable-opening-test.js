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
    beforeEach(inject(function (FindNonForkableOpening, FindCornerOpening, ___, _Board_, _Cell_, Players) {
      strategy = new FindNonForkableOpening(Players.O, Players.X)(new FindCornerOpening());
      _ = ___;
      Board = _Board_;
      Cell = _Cell_;
      X = Players.X;
      O = Players.O;
      EMPTY = Players.EMPTY;
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
    beforeEach(inject(function (FindNonForkableOpening, FindSideOpening, ___, _Board_, _Cell_, Players) {
      strategy = new FindNonForkableOpening(Players.X, Players.O)(new FindSideOpening());
      _ = ___;
      Board = _Board_;
      Cell = _Cell_;
      X = Players.X;
      O = Players.O;
      EMPTY = Players.EMPTY;
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
