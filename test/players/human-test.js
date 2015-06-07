describe('HumanPlayer', function () {
  var X, O, EMPTY, _, $q, $scope, Square, player, center, left;

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

  beforeEach(inject(function (HumanPlayer, Tokens, Board, _Square_, _$q_, ___, $rootScope) {
    Square = _Square_;
    _ = ___;
    $q = _$q_;
    $scope = $rootScope.$new();
    X = Tokens.X;
    O = Tokens.O;
    EMPTY = Tokens.EMPTY;
    center = new Square();
    left = new Square();
    var board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [left, center, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toSquare));
    player = new HumanPlayer(Tokens.X);
  }));

  it('should have to receive an action before performing its turn', function () {
    var deferred = $q.defer();

    player.giveTurn(deferred);
    player.doTurn(center);

    deferred.promise.then(function (square) {
      expect(square).to.eql(center);
    });

    $scope.$digest();
  });

  it('should only allow empty squares to be chosen', function () {
    var deferred = $q.defer();

    center.mark(X);

    player.giveTurn(deferred);
    player.doTurn(center);
    player.doTurn(left);

    deferred.promise.then(function (square) {
      expect(square).to.eql(left);
    });

    $scope.$digest();
  });
});
