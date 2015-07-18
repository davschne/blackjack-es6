// Generator for building the deck
function *rank() {
  for (let i = 2; i < 10; i++) {
    yield i;
  }
  yield "J";
  yield "Q";
  yield "K";
  yield "A";
}

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
  show() {
    return `${rank}${suit}`; // TEMPLATE STRING
  }
}

class Player {
  constructor() {
    this.cards = [];
    this.hardTotal = 0;
    this.softTotal = 0;
  }
  addCard(card) {
    // invariants:
    //   never add a card if hardTotal >= 21
    //   never add a card if softTotal == 21
    this.cards.push(card);
    // update hardTotal, softTotal
    if (card.rank === "A") {
      // Ace
      this.hardTotal += 1;
      this.softTotal += 11;
      if (this.softTotal > 21) {
        this.softTotal -= 10;
      }
    } else if (typeof card.rank === "string") {
      // Face cards
      this.hardTotal += 10;
      this.softTotal += 10;
    } else {
      // Non-face cards
      this.hardTotal += card.rank;
      this.softTotal += card.rank;
    }
  }
  getTotal() {
    if (this.hardTotal === 21 || this.softTotal === 21) {
      return 21;
    } else if (this.hardTotal > 21) {
      throw new Error(this);           // BUST
    } else if (this.softTotal > 21) {
      return this.hardTotal;
    } else {
      return this.softTotal;
    }
  }
}

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

class Dealer extends Player {
  constructor() {
    super();
    this.name = "Dealer";
  }
  hit() {
    if (hardTotal < 17) {
      return true; // hit
    } else {
      return false; // stand
    }
  }
  showCards() {
    var output = "XX"; // first card is face down
    for (let i = 1; i < this.cards.length; i++) { // LET BINDING
      output += ` ${this.cards[i].show()}`; // TEMPLATE STRING
    }
    return output;
  }
}

function game() {

  function turnLoop() {
    if (!player.hit) {
      return;
    } else {
      player.addCard(deck.pop());
      console.log(`${player.name}'s cards: ${player.showCards()}`);
      return Promise.resolve().then(turnLoop);
    }
  }

  function determineWinner(players) {}

  function bust(player) {}

  var players = [new User(), new Dealer()];
  // build deck
  // shuffle deck
  // deal cards
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

game();
