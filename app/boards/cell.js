'use strict';

module.exports = function (_, Players) {
  function Cell(token) {
    this.id = _.uniqueId();
    this.token = token || Players.EMPTY;
  }

  Cell.prototype.isEmpty = function () {
    return this.token === Players.EMPTY;
  };

  Cell.prototype.isPlayer = function (token) {
    return this.token === token;
  };

  Cell.prototype.mark = function (token) {
    this.token = token;
  };

  return Cell;
};
