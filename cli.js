var readline = require("readline");
process.stdin.setEncoding("utf8");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

new Promise(function yesOrNo(resolve, reject) {
  rl.question("Hit? ", function(answer) {
    var yes = /^y(?:es)?/i;
    var no = /^no?/i;
    if (yes.test(answer)) {
      console.log("Huzzah!");
      resolve("Hit");
    } else if (no.test(answer)) {
      console.log("Aw!");
      resolve("Stand");
    } else {
      console.log("Huh?");
      return Promise.resolve().then(yesOrNo);
    }
  });
}).then(function(answer) {
  console.log(answer);
}).catch(function(err) {
  console.log(err);
});
