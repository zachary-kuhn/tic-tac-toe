describe('Game', function () {
  var X, O, $scope, game;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (Game, Tokens, BoardStatus, $rootScope) {
    X = Tokens.X;
    O = Tokens.O;
    $scope = $rootScope.$new();
    game = new Game({});
  }));

  describe('#start', function () {
    it('should call the next turn for player X', function () {
      game.nextTurn = function (token) {
        expect(token).to.equal(X);
      };

      game.start();
    });
  });

  describe('#isFinished', function () {
    it('should be true when the board has a non-blank status', function () {
      game.status.get = function () {
        return 'completed';
      };

      expect(game.isFinished()).to.be.true;
    });

    it('should be false when the board has a blank status', function () {
      game.status.get = function () {
        return '';
      };

      expect(game.isFinished()).to.be.false;
    });
  });

  describe('#hasNoPlayers', function () {
    it('should be true when the game has no players', function () {
      game.players = undefined;

      expect(game.hasNoPlayers()).to.be.true;
    });

    it('should be false when the game has players', function () {
      game.players = {
        x: {}
      };

      expect(game.hasNoPlayers()).to.be.false;
    });
  });

  describe('#nextTurn', function () {
    it('should call #giveTurn of whichever player whose turn it is', function () {
      game.players[X] = {
        giveTurn: function (turn) {
          expect(turn).to.exist;
        }
      };

      game.nextTurn(X);
    });

    it('should mark the square that the player resolves the turn with', function () {
      var square = {
        mark: function (token) {
          expect(token).to.equal(X);
        }
      };

      game.players[X] = {
        giveTurn: function (turn) {
          turn.resolve(square);
        }
      };

      game.players[O] = {
        giveTurn: function () {}
      };

      game.nextTurn(X);

      $scope.$digest();
    });

    it('should give the turn to the next player', function () {
      var square = {
        mark: function (token) {}
      };

      game.players[X] = {
        giveTurn: function (turn) {
          turn.resolve(square);
        }
      };

      game.players[O] = {
        giveTurn: function (turn) {
          expect(turn).to.exist;
        }
      };

      game.nextTurn(X);

      $scope.$digest();
    });

    it('should not give the turn to the next player if the game is finished', function () {
      game.isFinished = function () {
        return true;
      };

      var square = {
        mark: function (token) {}
      };

      game.players[X] = {
        giveTurn: function (turn) {
          turn.resolve(square);
        }
      };

      game.players[O] = {
        giveTurn: function (turn) {
          throw Error('The game is finished and the turn should not be handed to the next player');
        }
      };

      game.nextTurn(X);

      $scope.$digest();
    });
  });
});
