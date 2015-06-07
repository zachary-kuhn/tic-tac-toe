describe('BoardStatus', function () {
  var Tokens, Board, Cell, _;

  var status;

  var board;

  var first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      ninth;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (Board, Cell, BoardStatus, _Tokens_, ___) {
    Tokens = _Tokens_;
    _ = ___;

    first = new Cell();
    second = new Cell();
    third = new Cell();
    fourth = new Cell();
    fifth = new Cell();
    sixth = new Cell();
    seventh = new Cell();
    eighth = new Cell();
    ninth = new Cell();

    board = new Board([[first, second, third],
                       [fourth, fifth, sixth],
                       [seventh, eighth, ninth]])

    status = new BoardStatus(board);
  }));

  describe('#isWon', function () {
    it('should be false when no triple is complete', function () {
      expect(status.isWon(Tokens.X)).to.be.false;
      expect(status.isWon(Tokens.O)).to.be.false;
    });

    function markWithToken(triple, token) {
      _.forEach(triple, function (cell) {
        cell.mark(token);
      });
    }

    function resetTriple(triple) {
      _.forEach(triple, function (cell) {
        cell.mark(Tokens.EMPTY);
      });
    }

    it('should be true for player X when any triple belongs to the player X', function () {
      _.forEach(board.getAllTriples(), function (triple) {
        markWithToken(triple, Tokens.X);

        expect(status.isWon(Tokens.X)).to.be.true;
        expect(status.isWon(Tokens.O)).to.be.false;

        resetTriple(triple);
      });
    });

    it('should be true for player O when any triple belongs to the player O', function () {
      _.forEach(board.getAllTriples(), function (triple) {
        markWithToken(triple, Tokens.O);

        expect(status.isWon(Tokens.O)).to.be.true;
        expect(status.isWon(Tokens.X)).to.be.false;

        resetTriple(triple);
      });
    });
  });

  function markBoardAsTie() {
    var X = Tokens.X, O = Tokens.O;

    first.mark(X);
    second.mark(O);
    third.mark(X);
    fourth.mark(X);
    fifth.mark(X);
    sixth.mark(O);
    seventh.mark(O);
    eighth.mark(X);
    ninth.mark(O);
  }

  describe('#isTie', function () {
    it('should be false when there are cells available', function () {
      expect(status.isTie()).to.be.false;
    });

    it('should be true when there are no more cells available', function () {
      markBoardAsTie();

      expect(status.isTie()).to.be.true;
    });
  });

  describe('#get', function () {
    it('should return blank when no player has won and there are moves remaining', function () {
      expect(status.get()).to.equal('');
    });

    it('should return "Player X won!" when player X has three in a row', function () {
      var X = Tokens.X;

      first.mark(X);
      second.mark(X);
      third.mark(X);

      expect(status.get()).to.equal('Player X won!');
    });

    it('should return "Player O won!" when player O has three in a row', function () {
      var O = Tokens.O;

      first.mark(O);
      second.mark(O);
      third.mark(O);

      expect(status.get()).to.equal('Player O won!');
    });

    it('should return "Tie!" when the board has no more moves', function () {
      markBoardAsTie();

      expect(status.get()).to.equal('Tie!');
    });
  });
});
