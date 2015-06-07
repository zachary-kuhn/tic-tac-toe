'use strict';

module.exports = function (_, Players) {
  /*
   * A condition builder is a domain specific language for describing how many
   * of what token appear in a triple on a tic-tac-toe board.
   */
  return function Builder(_and) {
    var count = 0;
    var player = Players.EMPTY;
    var and = _and || function () {
        return true;
      };

    function builder(triple) {
      return and(triple) && _.filter(triple, _.method('isPlayer', player)).length === count;
    }

    builder.has = function (_count) {
      count = _count;

      return builder;
    };

    builder.of = function (_player) {
      player = _player;

      return builder;
    };

    builder.and = function () {
      var moreConditions = new Builder(this);

      return moreConditions;
    };

    return builder;
  };
};
