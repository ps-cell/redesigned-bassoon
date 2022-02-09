<script lang="typescript">
  import Card from "@smui/card"
  import { Game } from "../knack"
  import PlayingCard from "./Card.svelte"
  export let hand
  export let scale
  export let hidden = false
  const score = Game.calcHandValue(hand)
</script>


<div style="display: flex; flex-direction: row;">
  {#each hand as card}
    <PlayingCard card={card} scale={scale} hidden={hidden}></PlayingCard>
  {/each}
</div>
