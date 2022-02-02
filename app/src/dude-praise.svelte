<script lang="ts">
	import GUN from "gun"
	import Card from '@smui/card'
	import Button from '@smui/button'

	// connect to relay (must be running, see readme)
	export const gun = GUN(["http://localhost:8765/gun"])
	let count = gun.get("count", (ack) => {})
	let _clicked = count.val || 0

	// listen for changes on count
	count.on((data) => {
		console.log("Update: ", data)
		_clicked = data.val
	})

	// click-event handler
	async function click() {
		_clicked++
		count.put({"val": _clicked})
	}

</script>

<Card padded style="margin: 50px;">
	<h1>The Dude abides.</h1>
	<Button color="#ff3e00" on:click={click} ripple >
		Praise
	</Button>
	<p>{_clicked}</p>
</Card>
