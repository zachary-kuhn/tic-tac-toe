'use strict';

module.exports = function (_) {
  return function () {
    return function (board) {
      return _.filter(board.getCorners(), _.method('isEmpty'));
    };
  };
};
