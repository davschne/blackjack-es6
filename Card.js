class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
  show() {
    return `${this.rank}${this.suit}`; // TEMPLATE STRING
  }
}

module.exports =  Card;
