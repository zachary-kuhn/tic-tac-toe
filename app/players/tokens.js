module.exports = function (Players) {
  this.getOpponent = function (token) {
    return token === Players.X ? Players.O : Players.X;
  };
};
