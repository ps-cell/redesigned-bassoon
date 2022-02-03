// Enum values are lowercased to match css classes
export enum Suit {
  Clubs = "clubs",
  Diamonds = "diamonds",
  Hearts = "hearts",
  Spades = "spades",
}

export class PlayingCard {
  constructor(readonly value: number, readonly suit: Suit) {
    if (value < 1 || value > 13) {
      throw new Error(`Card instantiated with improper value: ${value}`);
    }
  }

  formatValue(): string {
    switch (this.value) {
      case 1:
        return "ace";
      case 11:
        return "jack";
      case 12:
        return "queen";
      case 13:
        return "king";
      default:
        return `${this.value}`;
    }
  }

  isRedSuit(): boolean {
    return this.suit === Suit.Hearts || this.suit === Suit.Diamonds;
  }

  getStringRepresentation(): string {
    const value = this.formatValue();

    return `${value} of ${this.suit}`;
  }
}
