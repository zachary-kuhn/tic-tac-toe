'use strict';

module.exports = /* @ngInject */ function (_, Tokens) {
  function Cell(token) {
    this.id = _.uniqueId();
    this.token = token || Tokens.EMPTY;
  }

  Cell.prototype.isEmpty = function () {
    return this.token === Tokens.EMPTY;
  };

  Cell.prototype.isPlayer = function (token) {
    return this.token === token;
  };

  Cell.prototype.mark = function (token) {
    this.token = token;
  };

  return Cell;
};
