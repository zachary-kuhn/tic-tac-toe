describe('FindForkOpening', function () {
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
    beforeEach(inject(function (FindForkOpening, ___, _Board_, _Cell_, Tokens) {
      strategy = new FindForkOpening(Tokens.O);
      _ = ___;
      Board = _Board_;
      Cell = _Cell_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should return all possible fork openings for O', function () {
      var first = new Cell(),
          ninth = new Cell(),
          board = new Board(_.map([[first, EMPTY, O],
                                   [EMPTY, X, EMPTY],
                                   [O, EMPTY, ninth]],
                                  toCell));

      expect(strategy(board)).to.include.members([first, ninth]);
    });
  });

  describe('for player X', function () {
    beforeEach(inject(function (FindForkOpening, ___, _Board_, _Cell_, Tokens) {
      strategy = new FindForkOpening(Tokens.X);
      _ = ___;
      Board = _Board_;
      Cell = _Cell_;
      X = Tokens.X;
      O = Tokens.O;
      EMPTY = Tokens.EMPTY;
    }));

    it('should return all possible fork openings for X', function () {
      var seventh = new Cell(),
          board = new Board(_.map([[X, EMPTY, EMPTY],
                                   [EMPTY, O, EMPTY],
                                   [seventh, X, EMPTY]],
                                  toCell));

      expect(strategy(board)).to.include(seventh);
    });
  });
});
