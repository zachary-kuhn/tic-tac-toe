var angular = require('angular');
var _ = require('lodash');

var mod = angular.module('ticTacToe', []);

mod.constant('_', _);

mod.constant('Rows', {
  TOP: 0,
  MIDDLE: 1,
  BOTTOM: 2
});

mod.constant('Columns', {
  LEFT: 0,
  CENTER: 1,
  RIGHT: 2
});

mod.constant('Players', {
  X: 'x',
  O: 'o',
  EMPTY: ''
});

mod.factory('Cell', require('./boards/cell'));
mod.factory('Board', require('./boards/board'));
mod.factory('BoardStatus', require('./boards/status'));

mod.factory('ComputerStrategy', require('./players/computer-strategy'));
mod.factory('ComputerPlayer', require('./players/computer'));
mod.factory('HumanPlayer', require('./players/human'));
mod.factory('ConditionBuilder', require('./players/strategies/condition-builder'));
mod.factory('FindCenterOpening', require('./players/strategies/find-center-opening'));
mod.factory('FindCornerOpening', require('./players/strategies/find-corner-opening'));
mod.factory('FindCornerOppositeOpponentOpening', require('./players/strategies/find-corner-opposite-opponent-opening'));
mod.factory('FindForkOpening', require('./players/strategies/find-fork-opening'));
mod.factory('FindNonForkableOpening', require('./players/strategies/find-non-forkable-opening'));
mod.factory('FindSideOpening', require('./players/strategies/find-side-opening'));
mod.factory('FindWinningOpening', require('./players/strategies/find-winning-opening'));

mod.controller('BoardCtrl', require('./boards/board-ctrl'));
