'use strict';

module.exports = /* @ngInject */ function (Players) {
  this.getOpponent = function (token) {
    return token === Players.X ? Players.O : Players.X;
  };
};
