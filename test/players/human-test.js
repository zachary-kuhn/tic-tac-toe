describe('HumanPlayer', function () {
  var X, O, EMPTY, _, $q, $scope, Cell, player, center, left;

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

  beforeEach(inject(function (HumanPlayer, Tokens, Board, _Cell_, _$q_, ___, $rootScope) {
    Cell = _Cell_;
    _ = ___;
    $q = _$q_;
    $scope = $rootScope.$new();
    X = Tokens.X;
    O = Tokens.O;
    EMPTY = Tokens.EMPTY;
    center = new Cell();
    left = new Cell();
    var board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [left, center, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toCell));
    player = new HumanPlayer(Tokens.X);
  }));

  it('should have to receive an action before performing its turn', function () {
    var deferred = $q.defer();

    player.giveTurn(deferred);
    player.doTurn(center);

    deferred.promise.then(function (cell) {
      expect(cell).to.eql(center);
    });

    $scope.$digest();
  });

  it('should only allow empty cells to be chosen', function () {
    var deferred = $q.defer();

    center.mark(X);

    player.giveTurn(deferred);
    player.doTurn(center);
    player.doTurn(left);

    deferred.promise.then(function (cell) {
      expect(cell).to.eql(left);
    });

    $scope.$digest();
  });
});
