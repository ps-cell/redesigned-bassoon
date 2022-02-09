<link rel="stylesheet" href="./node_modules/svelte-material-ui/bare.css" />

<script lang="typescript">
  import Login from "./Login.svelte"
	import DudeCard from "./dude-praise.svelte"
	import ShowCase from "./card_showcase.svelte"
  import PlayingCard from "./deckapi/Card.svelte"
  import Hand from "./deckapi/Hand.svelte"
  import Card from "@smui/card";
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
  // test handvalue-calculation
  const you = new Player("p3")
  
  const players: Player[] = [
    new Player("p1"), new Player("p2"), you
  ]
  const game: Game = new Game(players)
  game.setup()
  console.log(game)
  console.log(game.players[0].hand)
  console.log(Game.calcHandValue(game.tableCards))
  console.log()


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
    height: 120%;
    margin: -40px -40px 0 -40px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("/resources/background.jpg");
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  .hands-container {
    display: flex; 
    flex-direction: column; 
    height: 70%; 
    width: 80%;
    justify-content: space-between;
    align-items: center;
    margin-top: -100px;
  }
  .other-hands {
    /*heck you <3*/
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width:80%;

  }
</style>

<main>
  <div on:mousemove={handleMouse} style={bg_pos} class="bg" id="bgimg">
    <!--<DudeCard/>-->
    <Login />
    <div class="hands-container">
      <div class="other-hands">
        {#each game.players.filter(x => x !== you) as player}
          <Hand hand={player.hand} scale={0.6} hidden/>
        {/each}
      </div>
      <Hand hand={game.tableCards} scale={0.8}/>
      <Hand hand={you.hand}/>
    </div>
  </div>
</main>
