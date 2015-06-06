module.exports = function (_, Players) {
  return function () {
    this.id = _.uniqueId();
    this.val = Players.EMPTY;

    this.isEmpty = function () {
      return this.val === Players.EMPTY;
    };

    this.isPlayer = function (player) {
      return this.val === player;
    };

    this.mark = function (player) {
      return this.val = player;
    };
  };
};
