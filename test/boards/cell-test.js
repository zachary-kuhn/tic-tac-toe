describe('Cell', function () {
  var Tokens, cell;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (Cell, _Tokens_) {
    Tokens = _Tokens_;

    cell = new Cell();
  }));

  describe('#isEmpty', function () {
    it('should return true when there is no value in the cell', function () {
      expect(cell.isEmpty()).to.be.true;
    });

    it('should return false when a player has marked the cell', function () {
      cell.mark(Tokens.X);
      expect(cell.isEmpty()).to.be.false;
    });
  });

  describe('#isPlayer', function () {
    it('should return false when the cell is empty', function () {
      expect(cell.isPlayer(Tokens.X)).to.be.false;
    });

    it('should return true when the cell is marked by the player', function () {
      cell.mark(Tokens.X);

      expect(cell.isPlayer(Tokens.X)).to.be.true;
    });

    it('should return false when the cell is marked by another player', function () {
      cell.mark(Tokens.O);

      expect(cell.isPlayer(Tokens.X)).to.be.false;
    });
  });

  describe('#mark', function () {
    it('should set the value of the cell to whichever player is marking it', function () {
      cell.mark(Tokens.X);

      expect(cell.isPlayer(Tokens.X)).to.be.true;
    });
  });
});
