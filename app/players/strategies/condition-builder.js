module.exports = function (_, Players) {
  return function Builder(_and) {
    var count = 0;
    var player = Players.EMPTY;
    var and = _and;

    function builder(triple) {
      if (and) {
        return and(triple) && _.filter(triple, _.method('isPlayer', player)).length === count;
      } else {
        return _.filter(triple, _.method('isPlayer', player)).length === count;
      }
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
