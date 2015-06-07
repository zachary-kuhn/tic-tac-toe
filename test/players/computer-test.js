describe('ComputerPlayer', function () {
  var X, O, EMPTY, _, $q, $scope, Square, player, board;

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

  beforeEach(inject(function (ComputerPlayer, Tokens, Board, _Square_, _$q_, ___, $rootScope) {
    Square = _Square_;
    _ = ___;
    $q = _$q_;
    $scope = $rootScope.$new();
    X = Tokens.X;
    O = Tokens.O;
    EMPTY = Tokens.EMPTY;
    board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                             [EMPTY, EMPTY, EMPTY],
                             [EMPTY, EMPTY, EMPTY]],
                            toSquare));
    player = new ComputerPlayer(Tokens.X);
  }));

  it('should perform its turn when given', function () {
    var deferred = $q.defer();

    player.giveTurn(deferred, board);

    deferred.promise.then(function (square) {
      expect(square).to.not.be.empty;
    });

    $scope.$digest();
  });
});
