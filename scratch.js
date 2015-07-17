

var Card = (function(inputSuit, inputValue) {

  // internal Rank class
  var Rank = (function(_value) {

    // internal helper functions
    var convertToNumber = (input) => {
      // This function also serves to validate input
      if (typeof input === "number" &&
          input > 1 &&
          input < 10) {
        return input;
      } else if (input === "J") {
        return 10;
      } else if (input === "Q") {
        return 11;
      } else if (input === "K") {
        return 12;
      } else if (input === "A") {
        return 13;
      } else {
        throw new Error("Not a valid rank");
      }
    };
    var convertFromNumber = (input) => {
      switch (input) {
        case 13:
          return "A";
        case 12:
          return "K";
        case 11:
          return "Q";
        case 10:
          return "J";
        default:
          return input;
      }
    };

    // numerical representation (private data)
    var valueNum;
    var value;

    return new class {
      constructor() {
        // validate input and convert to internal representation
        valueNum = convertToNumber(_value);
        value = convertFromNumber(valueNum);
      }
      getValue() {
        return value;
      }
      compareTo(that) {
        var thatValueNum = convertToNumber(that.getValue());
        // neg => this is lower rank
        // 0   => this is same rank
        // pos => this is higher rank
        return valueNum - thatValueNum;
      }
    }
  })();

  constructor() {
    // this.suit = suit;
    this.rank = new Rank(inputValue);
  }
})();
