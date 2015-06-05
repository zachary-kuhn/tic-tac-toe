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

module.factory('Cell', function (_, Players) {
  return function (row, column) {
    this.id = _.uniqueId();
    this.val = Players.EMPTY;

    this.mark = function (player) {
      return this.val = player;
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
      RIGHT = Columns.RIGHT,

      EMPTY = Players.EMPTY;

  return function () {
    var cells = _.times(3, function () {
      return _.times(3, function () {
        return new Cell();
      });
    });

    this.getCell = function (row, column) {
      return cells[row][column];
    };

    this.getAllCells = function () {
      return cells;
    };

    this.isWon = function (player) {
      return _.some(this.getAllTriples(), _.partial(_.all, _, { val: player }));
    };

    this.isTie = function () {
      return !_(cells).flatten().some({ val: Players.EMPTY });
    }

    this.getAllTriples = function () {
      var rows = _(Rows).values().map(getRow).value();
      var cols = _(Columns).values().map(getColumn).value();
      var diagonals = this.getDiagonals();

      return rows.concat(cols).concat(diagonals);
    };

    function getRow(row) {
      return cells[row];
    }

    function getColumn(column) {
      return _.map(cells, column);
    }

    this.getDiagonals = function () {
      return [getDownwardDiagonal(), getUpwardDiagonal()];
    };

    function getDownwardDiagonal() {
      return _.filter(cells, function (row, idx) {
        return row[idx];
      });
    }

    function getUpwardDiagonal() {
      return _.filter(cells, function (row, idx) {
        return row[2 - idx];
      });
    }

    this.isCorner = function (cell) {
      return _.contains(this.getCorners(), cell);
    };

    var edges = [0, 2];

    this.getCorners = function () {
      return [cells[0][0], cells[0][2],
              cells[2][0], cells[2][2]];
    };

    this.isSide = function (cell) {
      return _.contains(this.getSides(), cell);
    };

    this.getSides = function () {
      return [cells[0][1], cells[1][0],
              cells[1][2], cells[2][1]];
    };
  };
});

module.factory('FindWinningOpening', function (_, Players) {
  return function (player) {
    var isPlayer = { val: player },
        isEmpty = { val: Players.EMPTY };

    return function (board) {
      return _(board.getAllTriples()).filter(function (triple) {
          return _.filter(triple, isPlayer).length === 2 && _.filter(triple, isEmpty).length === 1;
        }).flatten().filter(isEmpty).value();
    };
  };
});

module.factory('FindForkOpening', function (_, Players) {
  return function (player) {
    var isPlayer = { val: player },
        isEmpty = { val: Players.EMPTY };

    return function (board) {
      return _(board.getAllTriples())
        .filter(function (triple) {
          return _.filter(triple, isPlayer).length === 1 && _.filter(triple, isEmpty).length === 2;
        })
        .flatten()
        .groupBy('id')
        .filter({ length: 2 })
        .map(_.first)
        .filter(isEmpty)
        .value();
    };
  }
});

module.factory('FindNonForkableOpening', function (_, Players, FindForkOpening) {
  var opponentFork = new FindForkOpening(Players.X);

  return function (strategy) {
    return function (board) {
      var openings = strategy(board),
          futureOpenings;

      return _.filter(openings, function (opening) {
        opening.val = Players.O;

        futureOpenings = opponentFork(board);

        opening.val = Players.EMPTY;

        return futureOpenings.length === 0;
      });
    };
  };
});

module.factory('FindCenterOpening', function (_, Players, Rows, Columns) {
  return function () {
    return function (board) {
      var center = board.getCell(Rows.MIDDLE, Columns.CENTER);

      if (center.val === Players.EMPTY) {
        return [center];
      } else {
        return [];
      }
    };
  };
});

module.factory('FindDiagonalOppositeOpponentOpening', function (_, Players) {
  var isOpponent = { val: Players.X },
      isEmpty = { val: Players.EMPTY };

  return function () {
    return function (board) {
      return _(board.getDiagonals()).filter(function (triple) {
        return _.find(triple, function (cell) {
          return board.isCorner(cell) && cell.val === Players.X;
        });
      }).flatten().filter(function (cell) {
        return board.isCorner(cell) && cell.isEmpty();
      }).value();
    };
  };
});

module.factory('FindDiagonalOpening', function (_, Players) {
  var isOpponent = { val: Players.X },
      isEmpty = { val: Players.EMPTY };

  return function () {
    return function (board) {
      return _(board.getCorners())
        .filter(function (cell) {
          return cell.isEmpty();
        }).value();
    };
  };
});

module.factory('FindSideOpening', function (_, Players) {
  var isOpponent = { val: Players.X },
      isEmpty = { val: Players.EMPTY };

  return function () {
    return function (board) {
      return _(board.getSides())
        .filter(function (cell) {
          return cell.isEmpty();
        }).value();
    };
  };
});

module.factory('Player', function (Players, Rows, Columns,
  FindWinningOpening, FindForkOpening, FindCenterOpening,
  FindDiagonalOppositeOpponentOpening, FindDiagonalOpening,
  FindSideOpening, FindNonForkableOpening) {
  return function (board) {
    var strategies = [
      new FindWinningOpening(Players.O),
      new FindWinningOpening(Players.X),
      new FindForkOpening(Players.O),
      new FindNonForkableOpening(new FindForkOpening(Players.O)),
      new FindNonForkableOpening(new FindCenterOpening()),
      new FindNonForkableOpening(new FindDiagonalOppositeOpponentOpening()),
      new FindNonForkableOpening(new FindDiagonalOpening()),
      new FindSideOpening()
    ];

    this.doMove = function () {
      _.find(strategies, function (strategy) {
        var openings = strategy(board),
            opening;

        if (!_.isEmpty(openings)) {
          opening = _.first(openings);
          return opening.val = Players.O;
        }
      });
    };
  };
});

module.controller('TicTacToeCtrl', function ($scope, Players, Player, Rows, Columns, Board) {
  $scope.Rows = Rows;
  $scope.Columns = Columns;

  $scope.playMove = function (cell) {
    cell.val = Players.X;

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
