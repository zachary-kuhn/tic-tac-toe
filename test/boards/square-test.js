describe('Square', function () {
  var Tokens, square;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (Square, _Tokens_) {
    Tokens = _Tokens_;

    square = new Square();
  }));

  describe('#isEmpty', function () {
    it('should return true when there is no value in the square', function () {
      expect(square.isEmpty()).to.be.true;
    });

    it('should return false when a player has marked the square', function () {
      square.mark(Tokens.X);
      expect(square.isEmpty()).to.be.false;
    });
  });

  describe('#isPlayer', function () {
    it('should return false when the square is empty', function () {
      expect(square.isPlayer(Tokens.X)).to.be.false;
    });

    it('should return true when the square is marked by the player', function () {
      square.mark(Tokens.X);

      expect(square.isPlayer(Tokens.X)).to.be.true;
    });

    it('should return false when the square is marked by another player', function () {
      square.mark(Tokens.O);

      expect(square.isPlayer(Tokens.X)).to.be.false;
    });
  });

  describe('#mark', function () {
    it('should set the value of the square to whichever player is marking it', function () {
      square.mark(Tokens.X);

      expect(square.isPlayer(Tokens.X)).to.be.true;
    });
  });
});
