module.exports = function ($q) {
  return function (player) {
    this.player = player;
    this.turn = $q.defer();
    this.victoryText = 'You won!';

    this.doTurn = function (cell) {
      if (cell && cell.isEmpty()) {
        return this.turn.notify(cell.mark(this.player));
      }
    };

    this.getTurn = function () {
      return this.turn.promise;
    };
  };
};
