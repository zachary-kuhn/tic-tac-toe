describe('Tokens', function () {
  var X, O, Tokens;

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

  beforeEach(inject(function (_Tokens_) {
    Tokens = _Tokens_;
    X = Tokens.X;
    O = Tokens.O;
  }));

  describe('#getOpponent', function () {
    it('should return X when given O', function () {
      expect(Tokens.getOpponent(X)).to.eql(O);
    });

    it('should return O when given X', function () {
      expect(Tokens.getOpponent(O)).to.eql(X);
    });

    it('should throw an error when given bad input', function () {
      expect(function () {
        Tokens.getOpponent('');
      }).to.throw(Error);
    });
  });
});
