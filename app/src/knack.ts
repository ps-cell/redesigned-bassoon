import type { PlayingCard, Suit } from "./deckapi/card"
import { Deck } from "./deckapi/deck"
//import { user } from "./user"
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

interface Score {
  value:number,
  suit:Suit|null,
  type?:number
}

export class Player {
  private _hand: PlayingCard[] = []
  public knack: boolean = false
  public lives: number = 4
  public closedHand: boolean = false

  constructor(public user: any /*gun.user*/) {}

  set hand(newHand: PlayingCard[]) {
    this._hand = newHand
    if (Game.calcHandValue(this._hand).value >= 32) {
      // knack-point is 32 (handled in score-calculation)
      this.knack = true
    }
  }
  get hand() {
    return this._hand
  }

}

export class Game {
  readonly deck: Deck = new Deck("deck32")
  public tableCards: PlayingCard[] = []

  constructor(readonly players: Player[]) {
    if (this.players.length > 9 || this.players.length === 0) {
      throw "Only between 2 and 9 players are allowed!"
    }
  }
  public static calcHandValue(hand: PlayingCard[]): Score {
    if (hand[0].value === hand[1].value && hand[1].value === hand[2].value) {
      if (hand[0].value === 1) {
        return { value : 33, suit : null } // Triple aces
      } else {
        return {value : 31, suit : null, type : hand[0].value } // triplet
      }
    }
    // object for counting card values
    let suitvalues : object = {
      "clubs" : 0,
      "spades" : 0,
      "hearts" : 0,
      "diamonds" : 0,
    }
    // add card values to suit
    for (const card of hand) {
      if (card.value > 10) {
        suitvalues[card.suit] += 10
      } else {
        suitvalues[card.suit] += card.value === 1 ? 11 : card.value
      }
    }
    // pick and return most valued suit
    let maxval : number = 0
    let maxsut : string
    for (const suit in suitvalues) {
      if (maxval < suitvalues[suit]) {
        // if maxval is 31, set it to 32 (knack-point)
        maxval = suitvalues[suit] === 31 ? 32 : suitvalues[suit]
        maxsut = suit
      }
    }
    return {
      value : maxval,
      suit : maxsut
    }
  }

  public static getScores(players: Player[]): [Score, Player][] {
    let scores: [Score, Player][] = []
    for (const player of players) {
      scores.push([Game.calcHandValue(player.hand), player])
    }
    return scores
  }


  askPlayer(player: Player, question: Question): Question {
    // TODO: implement this
    // Base Case
    question.a = question.default
    // mutate state according to answer
    return question
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
      // TODO: test this
      this.playRound()
    }
  }

  playRound(): void {
    this.deck.reset()
    let finalRound: boolean = false
    for (const player of this.players) { // TODO: this should be a `while-loop`
      const ans: Question = this.askPlayer(player, {
        "q": "What do you want to do?",
        "a": null, // insert gun.js here
        "default": Move.CloseHand
      })
      // check if the player won with this move
      if (player.knack) {
        this.finishRound()
        break
      }
      // TODO: handle players closing their hand
    }
    this.finishRound()
  }

  finishRound(): Player|void {
    // calculate hand values
    const scores: [Score, Player][] = Game.getScores(this.players)
    // find first player with lowest score
    const firstLoser: [Score, Player] = scores.reduce((prev, cur) => {
      return prev[0].value < cur[0].value ? prev : cur
    })
    // find other players with the same score
    let losers: Player[] = []
    for (const score of scores){
      if (score[0] === firstLoser[0]) {
        // TODO:
        // - multiple ppl have same value
        // -> determine higher suit
        // - multiple ppl have same value in same suit
        // -> determine highest card-value
        losers.push(score[1])
      }
    }
    // subtract lives from losers
    let killlist: Player[] = []
    for (const loser of losers) {
      loser.lives -= 1
      if (loser.lives === 0) {
        killlist.push(loser)
      }
    }
    // remove players with no lives left
    for (const loser of killlist) {
      this.players.splice(this.players.indexOf(loser))
    }
  }

}
