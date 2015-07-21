var Player = require("./Player");

class User extends Player { // "INHERITANCE"

  constructor(rl) {
    super();
    this.name = "User";
    this.rl = rl;
  }

  hit() {
    return new Promise( (resolve, reject) => {
      this.rl.question("Hit? > ", (answer) => {
        var yes = /^y(?:es)?/i;
        var no = /^no?/i;
        if (yes.test(answer)) {
          resolve(true);
        } else if (no.test(answer)) {
          resolve(false);
        } else {
          console.log("Please answer 'yes' or 'no.'");
          resolve(this.hit());
        }
      });
    });
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
