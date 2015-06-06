module.exports = function (_) {
  return function () {
    return function (board) {
      return _.filter(board.getCenter(), _.method('isEmpty'));
    };
  };
};
