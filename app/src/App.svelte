<link rel="stylesheet" href="./node_modules/svelte-material-ui/bare.css" />

<script lang="typescript">
  import Login from "./Login.svelte"
	import DudeCard from "./dude-praise.svelte"
	import ShowCase from "./card_showcase.svelte"
  import PlayingCard from "./deckapi/Card.svelte"
  import { Deck } from "./deckapi/deck"
  import { Player, Game } from "./knack"
  import { writable } from "svelte/store"
	let x: number = 0
	let y: number = 0
	let bg_pos: string = `background-position: ${x}px ${y}px`

  // track mouse-movement f/ moving bg-image
	function handleMouse(event){
		x = event.clientX / 80
		y = event.clientY / 80
		bg_pos = `background-position: ${x}px ${y}px`
	}

  // test playingcard-deck
  let testCard = writable()
  const cardDeck = new Deck("deck32")
  async function randomCards() {
    while (true) {
      testCard.set(cardDeck.safeDrawCard())
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  randomCards()

  // test handvalue-calculation
  const players: Player[] = [
    new Player("p1"), new Player("p2"), new Player("p3")
  ]
  const game: Game = new Game(players)
  game.setup()
  console.log(game)
  console.log(game.players[0].hand)
  console.log(Game.calcHandValue(game.players[0].hand))


</script>

<style lang="css">
    main {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .bg {
        height: 100%;
        margin: -40px -40px 0 -40px;
        padding-bottom: 500px;
        align-self: center;
        background-size: 120% auto;
        background-repeat: no-repeat;
        background-image: url("/resources/background.jpg");
        display: flex;
        flex-direction: column;
    }
</style>

<main>
  <div on:mousemove={handleMouse} style={bg_pos} class="bg" id="bgimg">
    <DudeCard/>
    <Login />
    <PlayingCard card={testCard} />
    <ShowCase/>
  </div>
</main>
