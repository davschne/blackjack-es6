// Generator for building the deck
function *iterateRanks() {
  for (let i = 2; i < 10; i++) {
    yield i;
  }
  yield "J";
  yield "Q";
  yield "K";
  yield "A";
}

function buildDeck(numDecks) {
  var deck = [];
  var suits = ["♠", "♣", "♡", "♢"];
  for (let d = 0; d < numDecks; d++) {
    for (let s = 0; s < suits.length; s++) {
      for (let r of iterateRanks()) {
        deck.push(new Card(r, suits[s]));
      }
    }
  }
  deck.shuffle();
  return deck;
}

function shuffle() {
  // Knuth shuffle
  var N = this.length;
  for (let i = 0; i < N; i++) {
    let r = Math.floor(Math.random() * (i + 1));
    let saved = this[i];
    this[i] = this[r];
    this[r] = saved;
  }
}

function game() {

  function turnLoop() {
    if (!player.hit) {
      // base case
      return;
    } else {
      // recursive case
      player.addCard(deck.pop());
      console.log(`${player.name} hits.`);
      console.log(`${player.name}'s cards: ${player.showCards()}`);
      return Promise.resolve().then(turnLoop);
    }
  }

  function deal(players, deck) {
    console.log("The deal...
      ");
    for (let i = 0; i < 2; i++) {
      for (let p = 0; p < players.length; p++) {
        players[p].addCard(deck.pop());
      }
    }
    players.forEach( (player) => {
      console.log(`${player.name}'s cards: ${player.showCards()}`);
    });
  }

  function determineWinner(players) {}

  function bust(player) {}

  var players = [new User(), new Dealer()];
  var deck = buildDeck(1);
  deal(players, deck);

  players.forEach( (player) => {
    Promise.resolve()
      .then(turnLoop)
      .catch( (err) => {
        bust(player);
      });
  }).then( () => {
    determineWinner(players);
  });
}

//game();
