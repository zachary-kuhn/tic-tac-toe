'use strict';

module.exports = /* @ngInject */ function (_, Tokens) {
  function Square(token) {
    this.id = _.uniqueId();
    this.token = token || Tokens.EMPTY;
  }

  Square.prototype.isEmpty = function () {
    return this.token === Tokens.EMPTY;
  };

  Square.prototype.isPlayer = function (token) {
    return this.token === token;
  };

  Square.prototype.mark = function (token) {
    this.token = token;
  };

  return Square;
};
