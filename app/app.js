'use strict';

var angular = require('angular');
require('angular-touch');
var _ = require('lodash');

// prevent elastic rebounding on iOS
document.ontouchmove = function(event){
  event.preventDefault();
};

var mod = angular.module('ticTacToe', ['ngTouch']);

// inline the small declarations
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

mod.constant('Tokens', {
  X: 'x',
  O: 'o',
  EMPTY: '',
  getOpponent: function (token) {
    if (token === this.X) {
      return this.O;
    } else if (token === this.O) {
      return this.X;
    } else {
      throw new Error('No opponents for token: ' + token);
    }
  }
});

mod.factory('Cell', require('./boards/cell'));
mod.factory('Board', require('./boards/board'));
mod.factory('BoardStatus', require('./boards/status'));
mod.factory('Game', require('./boards/game'));

mod.factory('Player', require('./players/player'));
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
