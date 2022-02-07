import { PlayingCard, Suit } from "./card";
import { shuffle } from "lodash";

export class Deck {
  private cards: PlayingCard[] = [];

  private decktype_dict = {
    deck52: 2,  // 2 is smallest number-card
    deck32: 7   // 7 is smallest number-card
  }

  // Support multiple decks
  constructor(private decktype = "deck52", private numDecks = 1) {
    this.reset();
  }

  shuffle(): void {
    this.cards = shuffle(this.cards); // Just use lodash
  }

  drawCard(): PlayingCard {
    if (this.cards.length == 0) {
      throw new Error("Tried to draw card from empty deck");
    }

    return this.cards.shift() as PlayingCard; // Guaranteed to return a PlayingCard since we throw an Error if array is empty
  }

  // Draws a card, resetting the deck beforehands if the Deck is empty
  safeDrawCard(): PlayingCard {
    if (this.cards.length === 0) {
      this.reset();
    }

    return this.drawCard();
  }

  // Reset the deck back to the original 52 cards and shuffle it
  reset(): void {
    this.cards = [];

    // determine selected decktype
    const smallest_value = this.decktype_dict[this.decktype]

    // push number- and facecards
    for (let i = smallest_value; i <= 13; ++i) {
      for (let j = 0; j < this.numDecks; ++j) {
        this.cards.push(new PlayingCard(i, Suit.Clubs));
        this.cards.push(new PlayingCard(i, Suit.Diamonds));
        this.cards.push(new PlayingCard(i, Suit.Hearts));
        this.cards.push(new PlayingCard(i, Suit.Spades));
      }
    }

    // push aces
    this.cards.push(new PlayingCard(1, Suit.Clubs));
    this.cards.push(new PlayingCard(1, Suit.Diamonds));
    this.cards.push(new PlayingCard(1, Suit.Hearts));
    this.cards.push(new PlayingCard(1, Suit.Spades));

    this.shuffle();
  }

  size(): number {
    return this.cards.length;
  }

  isEmpty(): boolean {
    return this.cards.length === 0;
  }
}
