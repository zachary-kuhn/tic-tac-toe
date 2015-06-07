describe('Tokens', function () {
  var X, O, Tokens;

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

  beforeEach(inject(function (_Tokens_, Players) {
    Tokens = _Tokens_;
    X = Players.X;
    O = Players.O;
  }));

  describe('#getOpponent', function () {
    it('should return X when given O', function () {
      expect(Tokens.getOpponent(X)).to.eql(O);
    });

    it('should return O when given X', function () {
      expect(Tokens.getOpponent(O)).to.eql(X);
    });
  });
});
