var Card = require("./Card");
// var Player = require("./Player");
var User = require("./User");
var Dealer = require("./Dealer");

// Generator for building the deck
function *iterateRanks() {
  for (let i = 2; i < 11; i++) {
    yield i;
  }
  yield "J";
  yield "Q";
  yield "K";
  yield "A";
}

function buildDeck(numPacks) {
  var deck = [];
  var suits = ["♠", "♣", "♡", "♢"];
  for (let d = 0; d < numPacks; d++) {
    for (let s = 0; s < suits.length; s++) {
      for (let r of iterateRanks()) {
        deck.push(new Card(r, suits[s]));
      }
    }
  }
  console.log(`Deck: ${deck.length} cards
    `);
  shuffle(deck);
  return deck;
}

function shuffle(array) {
  // Knuth shuffle
  var N = array.length;
  for (let i = 0; i < N; i++) {
    let r = Math.floor(Math.random() * (i + 1));
    let saved = array[i];
    array[i] = array[r];
    array[r] = saved;
  }
}

function *game() {

  function deal(players, deck) {
    console.log(`The deal...
      `);
    for (let i = 0; i < 2; i++) {
      for (let p = 0; p < players.length; p++) {
        players[p].addCard(deck.pop());
      }
    }
    players.forEach( (player) => {
      console.log(`${player.name}'s cards: ${player.showCards()}`);
    });
  }

  function turnLoop(player) {
    var hit = yield player;
    if (!hit) {
      // base case
      return;
    } else {
      // recursive case
      player.addCard(deck.pop());
      console.log(`${player.name} hits.`);
      console.log(`${player.name}'s cards: ${player.showCards()}`);
      return Promise.resolve(player).then(turnLoop);
    }
  }

  function determineWinner(players) {}

  function bust(player) {}

  console.log(`
Let's play some Blackjack!
    `);

  var players = [new User(), new Dealer()];
  var deck = buildDeck(1); // Here we build the deck from a single pack
  deal(players, deck);

  players.forEach(turnLoop);

  console.log("Game over.");
  determineWinner(players);
}

var it = game();
var player = it();

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
      // console.log("Huzzah!");
      resolve(true);
    } else if (no.test(answer)) {
      // console.log("Aw!");
      resolve(false);
    } else {
      console.log("Huh?");
      return Promise.resolve().then(yesOrNo);
    }
  });
}).then(function(answer) {
  console.log(answer);
  it(answer);
}).catch(function(err) {
  console.log(err);
});
