module.exports = function ($q, Players) {
  function Player(token) {
    this.token = token;
    this.turn = $q.defer();
  }

  Player.prototype.doTurn = function (cell) {
    if (cell && cell.isEmpty()) {
      return this.turn.notify(cell.mark(this.token));
    }
  };

  Player.prototype.getTurn = function () {
    return this.turn.promise;
  };

  return Player;
};
