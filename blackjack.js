var Card = require("./Card");
var User = require("./User");
var Dealer = require("./Dealer");

// Commandline argument sets number of packs to use for a game
var numPacks = process.argv[2];

var rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.stdin.setEncoding("utf8");

// GENERATOR for building the deck
function *iterateRanks() {
  for (let i = 2; i < 11; i++) {
    yield i;
  }
  yield "J";
  yield "Q";
  yield "K";
  yield "A";
}

function buildDeck(numPacks=1) { // DEFAULT PARAMETER
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
  console.log(`
  ${player.name}'s turn...
  `);
  return player.hit().then(function(hit) {
    if (!hit) {
      // base case
      console.log(`${player.name} stands.`);
      return;
    } else {
      // recursive case
      console.log(`${player.name} hits.`);
      player.addCard(deck.pop());
      console.log(`${player.name}'s cards: ${player.showCards()}`);
      return Promise.resolve(player).then(turnLoop); // TAIL RECURSION
    }
  });
}

function determineWinner(players) {
  var highScore = 0;
  var winner;
  var tie = false;
  for (let i = 0; i < players.length; i++) {
    if (!players[i].bust) {
      let score = players[i].getTotal();
      if (score > highScore) {
        winner = players[i];
        highScore = score;
      } else if (score === highScore) {
        tie = true;
      }
    }
  }
  console.log(`Dealer's cards: ${players[players.length - 1].revealAllCards()}`);
  if (tie) {
    console.log(`
  It's a tie at ${highScore}!
    `);
  } else {
    console.log(`
  ${winner.name} wins with a total of ${highScore}!
    `);
  }
}

function game(deck) {

  console.log(`
--------------------------
Let's play some Blackjack!
    `);

  // initialization

  var players = [new User(rl), new Dealer()];
  deal(players, deck);

  // game loop

  Promise.resolve().then(function() {
    return players.reduce( (sequence, player) => {
      return sequence.then(function() {
        return Promise.resolve(player).then(turnLoop);
      });
    }, Promise.resolve());
  })
  .catch( () => {
    return Promise.resolve();
  })
  .then( () => {
    determineWinner(players);
    rl.question("Play again? > ", (answer) => {
      var yes = /^y(?:es)?/i;
      if (!yes.test(answer)) {
        rl.close();
      } else {
        game(deck); // TAIL RECURSION
      }
    });
  });
};

var deck = buildDeck(numPacks);

game(deck);
