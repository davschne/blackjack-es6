var expect = require("chai").expect;
var Card = require("../Card");

describe("Card", function() {
  var card = new Card(2, "♡");
  it("should have property .rank", function() {
    expect(card).to.have.property("rank", 2);
  });
  it("should have property .suit", function() {
    expect(card).to.have.property("suit", "♡");
  });
  it(".show() should return a string with rank and suit", function() {
    expect(card.show()).to.equal("2♡");
  });
});
