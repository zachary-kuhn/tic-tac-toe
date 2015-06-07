describe('BoardCtrl', function () {
  var controller, Players, Board, Cell, $scope;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function ($controller, _Players_, _Board_, _Cell_, $rootScope) {
    Players = _Players_;
    Board = _Board_;
    Cell = _Cell_;
    $scope = $rootScope.$new();
    controller = $controller('BoardCtrl', { $scope: $scope });
  }));

  describe('#reset', function () {
    it('should set the player\'s token to X if passed', function () {
      controller.reset(Players.X);

      expect(controller.token).to.equal(Players.X);
    });

    it('should set the player\'s token to O if passed', function () {
      controller.reset(Players.O);

      expect(controller.token).to.equal(Players.O);
    });

    it('should empty the board\'s status', function () {
      controller.reset(Players.X);

      expect(controller.status).to.equal('');
    });

    it('should start the turn for Player X', function () {
      controller.startTurn = function (token) {
        expect(token).to.equal(Players.X);
      };

      controller.reset(Players.X);
    });

    it('should start the turn for Player X even if the player selects O', function () {
      controller.startTurn = function (token) {
        expect(token).to.equal(Players.X);
      };

      controller.reset(Players.O);
    });

    it('should reset the board', function () {
      var previousTriples = controller.board.getAllTriples();

      controller.reset(Players.X);

      expect(controller.board.getAllTriples()).to.not.eql(previousTriples);
    });
  });

  describe('#startTurn', function () {
    it('should give the turn to a player', function () {
      controller.reset(Players.X);

      function MockPlayer() {}

      MockPlayer.prototype.giveTurn = function (turn) {
        expect(turn).to.not.be.empty;
      };

      controller.players[Players.X] = new MockPlayer();

      controller.startTurn(Players.X);
    });

    it('should hand the turn over to the other player once the current player has finished', function () {
      controller.reset(Players.X);

      function MockXPlayer() {}

      MockXPlayer.prototype.giveTurn = function (turn) {
        turn.resolve(controller.board.getCenter()[0]);
      };

      function MockOPlayer() {}

      MockOPlayer.prototype.giveTurn = function (turn) {
        expect(turn).to.not.be.empty;
      };

      controller.players[Players.X] = new MockXPlayer();
      controller.players[Players.O] = new MockOPlayer();

      controller.startTurn(Players.X);

      $scope.$digest();
    });

    it('should mark the cell that has been passed to the resolve', function () {
      controller.reset(Players.X);

      function MockCell() {}
      MockCell.prototype.mark = function (token) {
        expect(token).to.equal(Players.X);
      };

      var cell = new MockCell();

      function MockPlayer() {}

      MockPlayer.prototype.giveTurn = function (turn) {
        turn.resolve(cell);
      };

      controller.players[Players.X] = new MockPlayer();

      controller.startTurn(Players.X);

      $scope.$digest();
    });

    it('should stop giving turns when the board has a completed status', function () {
      controller.reset(Players.X);

      function MockBoardStatus() {}

      MockBoardStatus.prototype.get = function () {
        return 'completed';
      };

      controller.boardStatus = new MockBoardStatus();

      function MockXPlayer() {}

      MockXPlayer.prototype.giveTurn = function (turn) {
        turn.resolve(controller.board.getCenter()[0]);
      };

      function MockOPlayer() {}

      MockOPlayer.prototype.giveTurn = function (turn) {
        throw new Error('Player O\'s #giveTurn should never be called');
      };

      controller.players[Players.X] = new MockXPlayer();
      controller.players[Players.O] = new MockOPlayer();

      controller.startTurn(Players.X);

      $scope.$digest();
    });
  });

  describe('#choosePlayer', function () {
    it('should call #reset with the selected player', function () {
      controller.reset = function (token) {
        expect(token).to.equal(Players.X);
      };

      controller.choosePlayer(Players.X);

      controller.reset = function (token) {
        expect(token).to.equal(Players.O);
      };

      controller.choosePlayer(Players.O);
    });
  });

  describe('#isPopoverVisible', function () {
    it('should be true when the board has a status', function () {
      controller.status = 'completed';

      expect(controller.isPopoverVisible()).to.be.true;
    });

    it('should be true when the board doesn\'t have a token for the player', function () {
      controller.token = Players.EMPTY;

      expect(controller.isPopoverVisible()).to.be.true;
    });

    it('should be false when the board has a token and no status', function () {
      controller.token = Players.X;
      controller.status = '';

      expect(controller.isPopoverVisible()).to.be.false;
    });
  });
});
