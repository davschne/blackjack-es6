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

    if (this.hardTotal < 21 && this.softTotal !== 21) {

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

module.exports = Player;
