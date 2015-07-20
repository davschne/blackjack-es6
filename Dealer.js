var Player = require("./Player");

class Dealer extends Player {
  constructor() {
    super();
    this.name = "Dealer";
  }
  hit() {
    if (this.hardTotal < 17) {
      return Promise.resolve(true); // hit
    } else {
      return Promise.resolve(false); // stand
    }
  }
  showCards() {
    var output = "XX"; // first card is face down
    for (let i = 1; i < this.cards.length; i++) { // LET BINDING
      output += ` ${this.cards[i].show()}`; // TEMPLATE STRING
    }
    return output;
  }
}

module.exports = Dealer;
