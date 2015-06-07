describe('FindCornerOppositeOpponentOpening', function () {
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
    beforeEach(inject(function (FindCornerOppositeOpponentOpening, ___, _Board_, _Cell_, Players) {
      strategy = new FindCornerOppositeOpponentOpening(Players.X);
      _ = ___;
      Board = _Board_;
      Cell = _Cell_;
      X = Players.X;
      O = Players.O;
      EMPTY = Players.EMPTY;
    }));

    it('should return an array of corners open opposite from player X', function () {
      var third = new Cell(),
          ninth = new Cell(),
          board = new Board(_.map([[X, EMPTY, third],
                                   [EMPTY, EMPTY, EMPTY],
                                   [X, EMPTY, ninth]],
                                  toCell));

      expect(strategy(board)).to.include.members([third, ninth]);
      expect(strategy(board)).to.have.length(2);
    });

    it('should not return corners opposite from O', function () {
      var third = new Cell(),
          board = new Board(_.map([[O, EMPTY, third],
                                   [EMPTY, EMPTY, EMPTY],
                                   [X, EMPTY, EMPTY]],
                                  toCell));

      expect(strategy(board)).to.include(third);
      expect(strategy(board)).to.have.length(1);
    });
  });

  describe('for player X', function () {
    beforeEach(inject(function (FindCornerOppositeOpponentOpening, ___, _Board_, _Cell_, Players) {
      strategy = new FindCornerOppositeOpponentOpening(Players.O);
      _ = ___;
      Board = _Board_;
      Cell = _Cell_;
      X = Players.X;
      O = Players.O;
      EMPTY = Players.EMPTY;
    }));

    it('should return an array of corners open opposite from player O', function () {
      var seventh = new Cell(),
          ninth = new Cell(),
          board = new Board(_.map([[O, EMPTY, O],
                                   [EMPTY, EMPTY, EMPTY],
                                   [seventh, EMPTY, ninth]],
                                  toCell));

      expect(strategy(board)).to.include.members([seventh, ninth]);
      expect(strategy(board)).to.have.length(2);
    });

    it('should not return corners opposite from O', function () {
      var first = new Cell(),
          board = new Board(_.map([[first, EMPTY, EMPTY],
                                   [EMPTY, EMPTY, EMPTY],
                                   [X, EMPTY, O]],
                                  toCell));

      expect(strategy(board)).to.include(first);
      expect(strategy(board)).to.have.length(1);
    });
  });
});
