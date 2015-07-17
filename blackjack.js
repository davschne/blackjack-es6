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
    this.cards.push(card);
    // update hardTotal, softTotal
    if (card.rank === "A") {
      // Ace
      this.hardTotal += 1;
      if (this.softTotal > 21) {
        this.softTotal += 1;
      } else {
        this.softTotal += 11;
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
}

class User extends Player { // "INHERITANCE"
  constructor() {
    super();
  }
  nextMove() {
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
    super()
  }
  nextMove() {
    if (hardTotal < 17) {
      return 1; // hit
    } else {
      return 0; // stay
    }
  }
}
