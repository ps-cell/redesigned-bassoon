<script lang="typescript">
  import { PlayingCard, Suit } from "./card"
  import { writable } from "svelte/store"

  // props
  export let value: number = 1
  export let suit: string = "Hearts"
  export let card: PlayingCard
  export let scale = 1
  export let hidden = true

  const playingCard = writable(card || new PlayingCard(value, Suit[suit]))
  if (hidden) {
    playingCard.set({
      value : 69,
      suit : Suit["Clubs"],
      formatValue : () => {}
    })
  }
</script>

<style>
  img {
    height: calc(var(--scale)*0.6*300px); width: calc(var(--scale)*0.6*200px);
    margin: 2px;
  }

  @keyframes rainbow {
      from {background-position: -50vh 0}
      to {background-position: 50vh 0}
  }
   .rainbow {
    border: double calc(var(--scale)*0.5em) transparent;
    border-radius: calc(var(--scale)*15px);
    background: linear-gradient(white, white),
    repeating-linear-gradient(to right, rgb(82, 82, 209),rgb(235, 50, 235), rgb(82, 82, 209));
    background-origin: border-box;
    background-clip: content-box, border-box;


              animation-name: rainbow;
              animation-duration:  calc(5s/var(--scale));

              animation-iteration-count: infinite;
              animation-timing-function: linear;
  }
</style>

<img context="PlayingCard" class="rainbow" src="/resources/deck/{$playingCard.formatValue() || '69'}_of_{$playingCard.suit.toLowerCase() || 'clubs'}.png" alt="hidden webcam footage of antons appartement" style="--scale: {scale}">
