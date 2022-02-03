/**
 * Represents a Hand of cards.
 *
 * This class is IMMUTABLE
 */

import type { PlayingCard } from "./card";

export class Hand {
  constructor(readonly cards: readonly PlayingCard[]) {}

  PlayingCard(...cards: PlayingCard[]): Hand {
    return new Hand([...this.cards, ...cards]);
  }

  removeByIndex(i: number): Hand {
    if (i >= this.cards.length) {
      throw new Error(`Tried to remove invalid card from Hand by index: ${i}`);
    }

    return new Hand([...this.cards.slice().splice(i, 1)]);
  }
}
