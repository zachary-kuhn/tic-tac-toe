describe('Board', function () {
  var board;

  var first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      ninth;

  beforeEach(module('ticTacToe'));

  beforeEach(inject(function (Board, Square) {
    first = new Square();
    second = new Square();
    third = new Square();
    fourth = new Square();
    fifth = new Square();
    sixth = new Square();
    seventh = new Square();
    eighth = new Square();
    ninth = new Square();

    board = new Board([[first, second, third],
                       [fourth, fifth, sixth],
                       [seventh, eighth, ninth]])
  }));

  describe('#getSides', function () {
    it('should return the side Squares as an array', function () {
      expect(board.getSides()).to.eql([second, fourth, sixth, eighth]);
    });
  });

  describe('#isSide', function () {
    it('should return if a square is on a side', function () {
      expect(board.isSide(second)).to.be.true;
      expect(board.isSide(fourth)).to.be.true;
      expect(board.isSide(sixth)).to.be.true;
      expect(board.isSide(eighth)).to.be.true;
    });
  });

  describe('#getCorners', function () {
    it('should return the corner squares as an array', function () {
      expect(board.getCorners()).to.eql([first, third, seventh, ninth]);
    });
  });

  describe('#isCorner', function () {
    it('should return if a square is in a corner', function () {
      expect(board.isCorner(first)).to.be.true;
      expect(board.isCorner(third)).to.be.true;
      expect(board.isCorner(seventh)).to.be.true;
      expect(board.isCorner(ninth)).to.be.true;
    });
  });

  describe('#getCenter', function () {
    it('should return the center square as an array', function () {
      expect(board.getCenter()).to.eql([fifth]);
    });
  });

  describe('#getDownwardDiagonal', function () {
    it('should return the triple that goes down from left to right', function () {
      expect(board.getDownwardDiagonal()).to.eql([first, fifth, ninth]);
    });
  });

  describe('#getUpwardDiagonal', function () {
    it('should return the triple that goes up from left to right', function () {
      expect(board.getUpwardDiagonal()).to.eql([third, fifth, seventh]);
    });
  });

  describe('#getDiagonals', function () {
    it('should return two triples, one for each diagonal', function () {
      expect(board.getDiagonals()).to.deep.include.members([
        [third, fifth, seventh],
        [first, fifth, ninth]
      ]);
    });
  });

  describe('#getAllTriples', function () {
    it('should return eight triples, one for way to win', function () {
      expect(board.getAllTriples()).to.deep.include.members([
        [first, second, third],
        [fourth, fifth, sixth],
        [seventh, eighth, ninth],
        [first, fourth, seventh],
        [second, fifth, eighth],
        [third, sixth, ninth],
        [third, fifth, seventh],
        [first, fifth, ninth]
      ]);
    });
  });
});
