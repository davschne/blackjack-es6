class Player {

  constructor() {
    this.cards = [];
    this.hardTotal = 0;
    this.softTotal = 0;
    this.bust = false;
  }

  addCard(card) {

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
    // Check if bust
    if (this.hardTotal > 21) {
      console.log(`${this.name} busts!
        `);
      this.bust = true;
      throw this;
    }
  }

  getTotal() {
    if (this.hardTotal === 21 || this.softTotal === 21) {
      return 21;
    } else if (this.softTotal > 21) {
      return this.hardTotal;
    } else {
      return this.softTotal;
    }
  }
}

module.exports = Player;
