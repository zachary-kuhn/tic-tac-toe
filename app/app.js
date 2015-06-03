var module = angular.module('ticTacToe', []);

module.constant('_', window._);

module.constant('Rows', {
  TOP: 0,
  MIDDLE: 1,
  BOTTOM: 2
});

module.constant('Columns', {
  LEFT: 0,
  CENTER: 1,
  RIGHT: 2
});

module.constant('Players', {
  X: 'x',
  O: 'o',
  EMPTY: ''
});

module.factory('Cell', function (Players) {
  return function (row, column) {
    this.row = row;
    this.column = column;
    this.val = Players.EMPTY;

    this.mark = function (player) {
      this.val = player;
    };
  };
})

module.factory('Board', function (_, Cell, Rows, Columns) {
  var TOP = Rows.TOP,
      MIDDLE = Rows.MIDDLE,
      BOTTOM = Rows.BOTTOM,

      LEFT = Columns.LEFT,
      CENTER = Columns.CENTER,
      RIGHT = Columns.RIGHT;

  return function () {
    this.slots = [new Cell(TOP, LEFT), new Cell(TOP, CENTER), new Cell(TOP, RIGHT),
                  new Cell(MIDDLE, LEFT), new Cell(MIDDLE, CENTER), new Cell(MIDDLE, RIGHT),
                  new Cell(BOTTOM, LEFT), new Cell(BOTTOM, CENTER), new Cell(BOTTOM, RIGHT)];

    this.getCell = function (row, column) {
      return _.find(this.slots, { row: row, column: column });
    };

    this.playMove = function (player, row, column) {
      _.find(this.slots, { row: row, column: column }).mark(player);
    };
  };
});

module.controller('TicTacToeCtrl', function ($scope, Players, Rows, Columns, Board) {
  $scope.Rows = Rows;
  $scope.Columns = Columns;

  $scope.board = new Board();

  $scope.playMove = function (row, column) {
    $scope.board.playMove(Players.X, row, column);
  };

  $scope.reset = function () {
    $scope.board = new Board();
  };
});
