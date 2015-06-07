describe('FindWinningOpening', function () {
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
    beforeEach(inject(function (FindWinningOpening, ___, _Board_, _Cell_, Players) {
      strategy = new FindWinningOpening(Players.O);
      _ = ___;
      Board = _Board_;
      Cell = _Cell_;
      X = Players.X;
      O = Players.O;
      EMPTY = Players.EMPTY;
    }));

    it('should return an empty array when there are no winning moves', function () {
      var board = new Board(_.map([[O, EMPTY, EMPTY],
                                   [EMPTY, X, X],
                                   [EMPTY, EMPTY, O]],
                                  toCell));

      expect(strategy(board)).to.eql([]);
    });

    it('should return an array of all available winning moves', function () {
      var first = new Cell(),
          third = new Cell(),
          sixth = new Cell(),
          board = new Board(_.map([[first, EMPTY, third],
                                   [O, O, sixth],
                                   [O, EMPTY, EMPTY]],
                                  toCell));

      expect(strategy(board)).to.have.length(3);
      expect(strategy(board)).to.include.members([first, third, sixth]);
    });
  });

  describe('for player X', function () {
    beforeEach(inject(function (FindWinningOpening, ___, _Board_, _Cell_, Players) {
      strategy = new FindWinningOpening(Players.X);
      _ = ___;
      Board = _Board_;
      Cell = _Cell_;
      X = Players.X;
      O = Players.O;
      EMPTY = Players.EMPTY;
    }));

    it('should return an empty array when there are no winning moves', function () {
      var board = new Board(_.map([[O, EMPTY, X],
                                   [EMPTY, X, EMPTY],
                                   [O, EMPTY, EMPTY]],
                                  toCell));

      expect(strategy(board)).to.eql([]);
    });

    it('should return an array of all available winning moves', function () {
      var third = new Cell(),
          board = new Board(_.map([[EMPTY, EMPTY, third],
                                   [O, X, EMPTY],
                                   [X, EMPTY, EMPTY]],
                                  toCell));

      expect(strategy(board)).to.have.length(1);
      expect(strategy(board)).to.include(third);
    });
  });
});
