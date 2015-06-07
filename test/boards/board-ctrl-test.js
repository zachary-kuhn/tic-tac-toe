describe('BoardCtrl', function () {
  var controller, Tokens, Board, Square, $scope;

  beforeEach(module('ticTacToe', function ($provide) {
    $provide.factory('Game', function () {
      function MockGame() {
        this.hasStarted = false;
      }

      MockGame.prototype.start = function () {
        this.hasStarted = true;
      };

      MockGame.prototype.isFinished = function () {
        return false;
      };

      MockGame.prototype.hasNoPlayers = function () {
        return false;
      };

      return MockGame;
    });
  }));

  beforeEach(inject(function ($controller, _Tokens_, _Board_, _Square_, $rootScope) {
    Tokens = _Tokens_;
    Board = _Board_;
    Square = _Square_;
    $scope = $rootScope.$new();
    controller = $controller('BoardCtrl', { $scope: $scope });
  }));

  describe('#choosePlayer', function () {
    it('should set the player\'s token to X if passed', function () {
      controller.choosePlayer(Tokens.X);

      expect(controller.token).to.equal(Tokens.X);
    });

    it('should set the player\'s token to O if passed', function () {
      controller.choosePlayer(Tokens.O);

      expect(controller.token).to.equal(Tokens.O);
    });

    it('should create a new game', function () {
      var previousGame = controller.game;

      controller.choosePlayer(Tokens.X);

      expect(controller.game).to.not.equal(previousGame);
    });

    it('should start a new game', function () {
      controller.choosePlayer(Tokens.X);

      expect(controller.game.hasStarted).to.be.true;
    });
  });

  describe('#isPopoverVisible', function () {
    it('should be true when the board is finished', function () {
      controller.game.isFinished = function () {
        return true;
      };

      expect(controller.isPopoverVisible()).to.be.true;
    });

    it('should be true when the board doesn\'t have a token for the player', function () {
      controller.game.hasNoPlayers = function () {
        return true;
      };

      expect(controller.isPopoverVisible()).to.be.true;
    });

    it('should be false when the board has a token and no status', function () {
      expect(controller.isPopoverVisible()).to.be.false;
    });
  });
});
