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
  var edges = [0, 2];

  return function (row, column) {
    this.row = row;
    this.column = column;
    this.val = Players.EMPTY;

    this.mark = function (player) {
      return this.val = player;
    };

    this.isCorner = function () {
      return _.contains(edges, this.row) && _.contains(edges, this.column);
    };

    this.isEmpty = function () {
      return this.val === Players.EMPTY;
    };
  };
});

module.factory('Board', function (_, Players, Cell, Rows, Columns) {
  var TOP = Rows.TOP,
      MIDDLE = Rows.MIDDLE,
      BOTTOM = Rows.BOTTOM,

      LEFT = Columns.LEFT,
      CENTER = Columns.CENTER,
      RIGHT = Columns.RIGHT;

  return function () {
    var cells = [new Cell(TOP, LEFT), new Cell(TOP, CENTER), new Cell(TOP, RIGHT),
                 new Cell(MIDDLE, LEFT), new Cell(MIDDLE, CENTER), new Cell(MIDDLE, RIGHT),
                 new Cell(BOTTOM, LEFT), new Cell(BOTTOM, CENTER), new Cell(BOTTOM, RIGHT)];

    this.getCell = function (row, column) {
      return _.find(cells, { row: row, column: column });
    };

    this.getAllCells = function () {
      return cells;
    };

    this.playMove = function (player, row, column) {
      return _.find(cells, { row: row, column: column }).mark(player);
    };

    this.isWon = function (player) {
      return _.some(this.getAllTriples(), function (triple) {
        return _.filter(triple, { val: player }).length === 3;
      });
    };

    this.isTie = function () {
      return !_.some(cells, { val: Players.EMPTY });
    }

    this.getAllTriples = function () {
      var rows = _(Rows).values().map(getRow).value();
      var cols = _(Columns).values().map(getColumn).value();
      var diagonals = this.getDiagonals();

      return rows.concat(cols).concat(diagonals);
    };

    function getRow(row) {
      return _.filter(cells, { row: row });
    }

    function getColumn(column) {
      return _.filter(cells, { column: column });
    }

    this.getDiagonals = function () {
      return [getDownwardDiagonal(), getUpwardDiagonal()];
    };

    function getDownwardDiagonal() {
      return _.filter(cells, function (cell) {
        return cell.row === cell.column
      });
    }

    function getUpwardDiagonal() {
      return _.filter(cells, function (cell) {
        return cell.row === 2 - cell.column;
      });
    }
  };
});

module.factory('Player', function (Players, Rows, Columns) {
  return function (board) {
    var strategies = [
      getWinningOpening(Players.O),
      getWinningOpening(Players.X),
      getForkOpening(Players.O),
      andTheOpponentCantFork(getForkOpening(Players.X)),
      getCenterOpening,
      getDiagonalOpening,
      getSideOpening,
      getAnyOpening
    ];

    this.doMove = function () {
      _.find(strategies, function (strategy) {
        var openings = strategy(),
            opening;

        if (!_.isEmpty(openings)) {
          opening = _.first(openings);
          return board.playMove(Players.O, opening.row, opening.column);
        }
      });
    };

    function getWinningOpening(player) {
      var isPlayer = { val: player },
          isEmpty = { val: Players.EMPTY };

      return function () {
        return _(board.getAllTriples()).filter(function (triple) {
          return _.filter(triple, isPlayer).length === 2 && _.filter(triple, isEmpty).length === 1;
        }).flatten().filter(isEmpty).value();
      };
    }

    function getForkOpening(player) {
      var isPlayer = { val: player },
          isEmpty = { val: Players.EMPTY };

      return function () {

        return _(board.getAllTriples())
          .filter(function (triple) {
            return _.filter(triple, isPlayer).length === 1 && _.filter(triple, isEmpty).length === 2;
          })
          .flatten()
          .groupBy(function (cell) {
            return [cell.row, cell.column].join(' ');
          })
          .filter({ length: 2 })
          .map(_.first)
          .filter(isEmpty)
          .value();
        // return _(board.getAllCells()).find(function (cell) {
        //   return _(board.getAllTriples()).filter(_.partial(_.contains, _, cell))
        //     .filter(function (triple) {
        //       return _.filter(triple, isPlayer).length === 1 && _.filter(triple, isEmpty).length === 2;
        //     }).value().length === 2;
        // });
      };
    }

    function andTheOpponentCantFork(possibleForker) {
      var openings = possibleForker(),
          opponentForks = getForkOpening(Players.X),
          futureOpenings;

      return function () {
        return _.filter(openings, function (opening) {
          board.playMove(Players.O, opening.row, opening.column);

          futureOpenings = possibleForker();

          board.playMove(Players.EMPTY, opening.row, opening.column);

          return futureOpenings.length === 0;
        });
      };
    }

    function getCenterOpening() {
      var center = board.getCell(Rows.MIDDLE, Columns.CENTER);

      if (center.val === Players.EMPTY) {
        return [center];
      } else {
        return [];
      }
    }

    function getSideOpening() {
      var isOpponent = { val: Players.X };

      return _(board.getAllTriples()).filter(function (triple) {
        return _.any(triple, isOpponent);
      }).flatten().filter(function (cell) {
        return !cell.isCorner() && cell.isEmpty();
      }).value();
    }

    function getDiagonalOpening() {
      var isOpponent = { val: Players.X },
          isEmpty = { val: Players.EMPTY };

      return _(board.getDiagonals()).filter(function (triple) {
        return _.any(triple, isOpponent);
      }).flatten().filter(function (cell) {
        return cell.isCorner() && cell.isEmpty();
      }).value();
    }

    function getAnyOpening() {
      var isEmpty = { val: Players.EMPTY };

      return _(board.getAllTriples()).filter(function (triple) {
        return _.any(triple, isEmpty);
      }).flatten().filter(isEmpty).value();
    }
  };
});

module.controller('TicTacToeCtrl', function ($scope, Players, Player, Rows, Columns, Board) {
  $scope.Rows = Rows;
  $scope.Columns = Columns;

  $scope.playMove = function (row, column) {
    $scope.board.playMove(Players.X, row, column);

    checkStatus();

    if (!$scope.status) {
      $scope.player.doMove();

      checkStatus();
    }
  };

  function checkStatus() {
    if ($scope.board.isWon(Players.X)) {
      $scope.status = "You won!";
    } else if ($scope.board.isWon(Players.O)) {
      $scope.status = "You lost :(";
    } else if ($scope.board.isTie()) {
      $scope.status = "Tied!";
    }
  }

  $scope.reset = function () {
    $scope.board = new Board();
    $scope.player = new Player($scope.board);
    $scope.status = "";
  };

  (function init() {
    $scope.reset();
  }());
});
