var Player = require("./Player");
var rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class User extends Player { // "INHERITANCE"

  constructor() {
    super();
    this.name = "Player";
    // this.rl = rl;
    // console.log(this.rl);
  }

  // This works!
  hit() {
    return new Promise( (resolve, reject) => {
      // console.log("hti sklfj s dsldsj")
      // resolve("this is a test thing");
      // console.log('rl  is not fun', rl);
      // resolve("what is up")
      rl.question("Hit? > ", (answer) => {
        // return resolve(answer);
        console.log("hit func callback in readline ")
        var yes = /^y(?:es)?/i;
        var no = /^no?/i;
        if (yes.test(answer)) {
          resolve(true);
        } else if (no.test(answer)) {
          resolve(false);
        } else {
          console.log("Huh?");
          resolve(this.hit());
        }
      });
    });
  }

// function callHit(){
// hit().then(function(didHit){
//   if (didHit){
//     // do shit
//   }
// }).catch(function(err){
//   callHit();
// });
// }

  hir(){
    return new Promise(function(resolve, reject){
      this.rl.question("Hit?", function(answer){
        var yes = /^y(?:es)?/i;
        var no = /^no?/i;
        if (yes.test(answer)){
          resolve(true)
        } else if (no.test(answer)){
          resolve(false)
        } else {
          reject("incorrect input")
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
