var expect = require("chai").expect;
var Card = require("../Card");
var Player = require("../Player");

describe("Player", function() {
  var player = new Player();
  it("should have property .cards, an array", function() {
    expect(player.cards).to.be.an("array");
  });
  it("should have property .hardTotal, a number", function() {
    expect(player.hardTotal).to.be.a("number");
  });
  it("should have property .softTotal, a number", function() {
    expect(player.softTotal).to.be.a("number");
  });

  describe(".addCard()", function() {
    var player;
    var kingOfHearts = new Card("K", "♡")
    var twentyOneOfHearts = new Card(21, "♡");
    var twoOfHearts = new Card(2, "♡");
    var aceOfHearts = new Card("A", "♡");

    beforeEach(function() {
      player = new Player();
    });

    it("should add a card to .cards", function() {
      player.addCard(kingOfHearts);
      expect(player.cards).to.contain(kingOfHearts);
    });
    it("should not add a card if .hardTotal >= 21", function() {
      player.addCard(twentyOneOfHearts);
      player.softTotal = 0;
      player.addCard(twoOfHearts);
      expect(player.cards).not.to.contain(twoOfHearts);
    });
    it("should not add a card if .softTotal === 21", function() {
      player.hardTotal = 0;
      player.softTotal = 21;
      player.addCard(twoOfHearts);
      expect(player.cards).not.to.contain(twoOfHearts);
    });

    player = new Player();

    it("should increment .softTotal by 11 when an Ace is added if doing so would not make .softTotal > 21", function() {
      player.addCard(aceOfHearts);
      expect(player.softTotal).to.equal(11);
    });
    it("should otherwise increment .softTotal by 1 when an Ace is added", function() {
      player.softTotal = 11;
      player.addCard(aceOfHearts);
      expect(player.softTotal).to.equal(12);
    });
    it("should increment .hardTotal by 1 when an Ace is added", function() {
      player.addCard(aceOfHearts);
      expect(player.hardTotal).to.equal(1);
    });
    it("should increment .hardTotal by 10 when a face card is added", function() {
      player.addCard(kingOfHearts);
      expect(player.hardTotal).to.equal(10);
    });
    it("should increment .softTotal by 10 when a face card is added", function() {
      player.addCard(kingOfHearts);
      expect(player.softTotal).to.equal(10);
    });
  });
});
