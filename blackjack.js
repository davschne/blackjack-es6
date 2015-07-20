// var readline = require("readline");
// process.stdin.setEncoding("utf8");

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

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

function game() {

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
    console.log(`${player.name}'s turn...\n`);
    return player.hit().then(function(hit) {
      console.log('hit is ', hit);
      if (!hit) {
        // base case
        console.log('hit was falsy');
        return;
      } else {
        console.log('hit was true');
        // recursive case
        player.addCard(deck.pop());
        console.log(`${player.name} hits.`);
        console.log(`${player.name}'s cards: ${player.showCards()}`);
        return Promise.resolve(player).then(turnLoop);
      }
    });
  }

  function determineWinner(players) {}

  function bust(player) {}

  console.log(`
Let's play some Blackjack!
    `);

  var players = [new User(), new Dealer()];
  var deck = buildDeck(1); // Here we build the deck from a single pack
  deal(players, deck);

  // This is working!
  Promise.resolve(players[0]).then(turnLoop)
    .then(function() {
      return Promise.resolve(players[1]).then(turnLoop);
    })
    .then( () => {
      console.log("Game over.");
      determineWinner(players);
    });

  // Promise.resolve().then(function() {
  //   return players.reduce( (sequence, player) => {
  //     return sequence.then(function() {
  //       Promise.resolve(player)
  //         .then(turnLoop)
  //         .catch( (err) => {
  //           bust(player);
  //         });
  //     });
  //   }, Promise.resolve());
  // }).then( () => {
  //   console.log("Game over.");
  //   determineWinner(players);
  // });
}

game();
