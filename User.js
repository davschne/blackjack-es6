var Player = require("./Player");
var readline = require("readline");
process.stdin.setEncoding("utf8");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

class User extends Player { // "INHERITANCE"

  constructor() {
    super();
    this.name = "Player";
  }

  hit() {
    return new Promise(function yesOrNo(resolve, reject) {
      rl.question("Hit? ", function(answer) {
        var yes = /^y(?:es)?/i;
        var no = /^no?/i;
        if (yes.test(answer)) {
          return resolve(true);
        } else if (no.test(answer)) {
          return resolve(false);
        } else {
          console.log("Huh?");
          return Promise.resolve().then(yesOrNo);
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
