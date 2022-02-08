<script lang="typescript">
  import Card from "@smui/card"
  import { Game } from "../knack"
  import PlayingCard from "./Card.svelte"
  export let hand
</script>


<div style="display: flex; flex-direction: row">
  <PlayingCard card={hand[0]} ></PlayingCard>
  <PlayingCard card={hand[1]} ></PlayingCard>
  <PlayingCard card={hand[2]} ></PlayingCard>
  <Card><p style="font-size: 30pt">
  {Game.calcHandValue(hand).value}<br>
  {Game.calcHandValue(hand).suit}
  </p></Card>
</div>
