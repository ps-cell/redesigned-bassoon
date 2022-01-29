<link rel="stylesheet" href="./node_modules/svelte-material-ui/bare.css" />

<script lang="ts">
	import Card from '@smui/card'
	import Button from '@smui/button'
	let clicked = 0;
</script>

<main>
	<Card padded>
		<h1>The Dude abides.</h1>
		<Button color="#ff3e00" on:click={() => clicked++} ripple={true}>
    		Praise
  		</Button>
		<p>{clicked}</p>
	</Card>
</main>
