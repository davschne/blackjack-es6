var Player = require("./Player");

class User extends Player { // "INHERITANCE"
  constructor() {
    super();
    this.name = "Player";
  }
  hit() {
    // TODO: prompt user for input
  }
  showCards() {
    var output = this.cards[0].show();
    for (let i = 1; i < this.cards.length; i++) { // LET BINDING
      output += ` ${this.cards[i].show()}`; // TEMPLATE STRING
    }
    return output;
  }
}

module.exports = User;
