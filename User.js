var Player = require("./Player");
// var readline = require("readline");
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

class User extends Player { // "INHERITANCE"

  constructor(rl) {
    super();
    this.name = "User";
    this.rl = rl;
    // console.log(this.rl);
  }

  // This works!
  hit() {
    return new Promise( (resolve, reject) => {
      this.rl.question("Hit? > ", (answer) => {
        var yes = /^y(?:es)?/i;
        var no = /^no?/i;
        var resolution;
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
