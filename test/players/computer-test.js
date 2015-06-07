describe('ComputerPlayer', function () {
  var X, O, EMPTY, _, $q, $scope, Cell, player;

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

  beforeEach(inject(function (ComputerPlayer, Players, Board, _Cell_, _$q_, ___, $rootScope) {
    Cell = _Cell_;
    _ = ___;
    $q = _$q_;
    $scope = $rootScope.$new();
    X = Players.X;
    O = Players.O;
    EMPTY = Players.EMPTY;
    var board = new Board(_.map([[EMPTY, EMPTY, EMPTY],
                                 [EMPTY, EMPTY, EMPTY],
                                 [EMPTY, EMPTY, EMPTY]],
                                toCell));
    player = new ComputerPlayer(Players.X, board, Players.O);
  }));

  it('should perform its turn when given', function () {
    var deferred = $q.defer();

    player.giveTurn(deferred);

    deferred.promise.then(function (cell) {
      expect(cell).to.not.be.empty;
    });

    $scope.$digest();
  });
});
