import type { PlayingCard } from "./deckapi/card"
import { Deck } from "./deckapi/deck"
import { user } from "./user"
//import Math;


export enum Move {
  SwapCard,   // swap a single card
  SwapHand,   // swap entire hand
  CloseHand,  // announce end of round
  KeepHand    // keep own hand, when choosing at start
}

interface Question {
  q:string|object
  a:Move
  default:Move
}

function calcHandValue(hand: PlayingCard[]): number {
  // TODO: implement this
  return 0
}

export class Player {
  private _hand: PlayingCard[] = []
  public knack: boolean = false
  public lifes: number = 4

  constructor(public user: any /*gun.user*/) {}

  set hand(newHand: PlayingCard[]) {
    this._hand = newHand
    if (calcHandValue(this._hand) >= 31) {
      this.knack = true
    }
  }

}

export class Game {
  readonly deck: Deck = new Deck("deck32")
  public tableCards: PlayingCard[] = []

  reset(): void {
    this.deck.reset()
  }

  constructor(readonly players: Player[]) {
    if (this.players.length > 9 || this.players.length === 0) {
      throw "Only between 2 and 9 players are allowed!"
    }
    this.reset()
  }

  askPlayer(player: Player, question: Question): Move {
    // TODO: implement this
    // Base Case
    return question.default
  }

  setup(): void {
    // every player draws 3 cards
    this.players.forEach(player => {
      player.hand = ([
        this.deck.safeDrawCard(),
        this.deck.safeDrawCard(),
        this.deck.safeDrawCard(),
      ])
      /*
      player.hand.push(this.deck.safeDrawCard())
      player.hand.push(this.deck.safeDrawCard())
      player.hand.push(this.deck.safeDrawCard())
      */
    });
    // table gets 3 cards aswell
    this.tableCards.push(this.deck.safeDrawCard())
    this.tableCards.push(this.deck.safeDrawCard())
    this.tableCards.push(this.deck.safeDrawCard())
  }

  startGame(): void {

    this.setup()

    const firstPlayer = this.players[Math.floor(Math.random() * this.players.length)];
    this.askPlayer(firstPlayer, {
      "q": "What hand do you choose?",
      "a": null, // insert gun.js here
      "default": Move.KeepHand,
    })

    // RUN GAME
    while (this.players.length > 1){
      // TODO: implement this
    }
  }

  playRound(): void {
    for (const player of this.players) {
      this.askPlayer(player, {
        "q": "What do you want to do?",
        "a": null, // insert gun.js here
        "default": Move.CloseHand
      })
      if (player.knack) {
        // finish round
      }
      // TODO:
      // - check if a player closed their hand
    }
    // TODO:
    // - finish round
  }

  finishRound(): Player|void {
    // TODO: implement this
    // - calculate hand values
    // - subtract lives from losers
    // - remove players with no lives left
  }

}
