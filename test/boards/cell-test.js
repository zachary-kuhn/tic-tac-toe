describe('Cell', function () {
  var Players, cell;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (Cell, _Players_) {
    Players = _Players_;

    cell = new Cell();
  }));

  describe('#isEmpty', function () {
    it('should return true when there is no value in the cell', function () {
      expect(cell.isEmpty()).to.be.true;
    });

    it('should return false when a player has marked the cell', function () {
      cell.mark(Players.X);
      expect(cell.isEmpty()).to.be.false;
    });
  });

  describe('#isPlayer', function () {
    it('should return false when the cell is empty', function () {
      expect(cell.isPlayer(Players.X)).to.be.false;
    });

    it('should return true when the cell is marked by the player', function () {
      cell.mark(Players.X);

      expect(cell.isPlayer(Players.X)).to.be.true;
    });

    it('should return false when the cell is marked by another player', function () {
      cell.mark(Players.O);

      expect(cell.isPlayer(Players.X)).to.be.false;
    });
  });

  describe('#mark', function () {
    it('should set the value of the cell to whichever player is marking it', function () {
      cell.mark(Players.X);

      expect(cell.isPlayer(Players.X)).to.be.true;
    });
  });
});
