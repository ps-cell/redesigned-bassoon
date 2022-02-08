<script lang="typescript">
  import { PlayingCard, Suit } from "./card"
  import { writable } from "svelte/store"

  // props
  export let value: number = 1
  export let suit: string = "Hearts"
  export let card: PlayingCard

  const playingCard = card || writable(new PlayingCard(value, Suit[suit]))

</script>

<style>
  img {
    height: 300px; width:200px
  }

  @keyframes rainbow {
      from {background-position: -50vh 0}
      to {background-position: 50vh 0}
  }
   .rainbow {
    border: double 0.5em transparent;
    border-radius: 15px;
    background: linear-gradient(white, white),
    repeating-linear-gradient(to right, rgb(82, 82, 209),rgb(235, 50, 235), rgb(82, 82, 209));
    background-origin: border-box;
    background-clip: content-box, border-box;


              animation-name: rainbow;
              animation-duration:  5s;

              animation-iteration-count: infinite;
              animation-timing-function: linear;
  }
</style>

<img context="PlayingCard" class="rainbow" src="/resources/deck/{$playingCard.formatValue() || '2'}_of_{$playingCard.suit.toLowerCase() || 'hearts'}.png" alt="hidden webcam footage of antons appartement">
