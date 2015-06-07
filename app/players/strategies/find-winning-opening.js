'use strict';

module.exports = /* @ngInject */ function (_, Tokens, ConditionBuilder) {
  return function (token) {
    /*
     * A winning opening is any triple on the board with two of the player and
     * one empty square.
     */
    return function (board) {
      return _(board.getAllTriples()).filter(
          new ConditionBuilder().has(2).of(token).and().has(1).of(Tokens.EMPTY)
        )
        .flatten().filter(_.method('isEmpty')).value();
    };
  };
};
