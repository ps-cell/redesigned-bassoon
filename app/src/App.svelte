<link rel="stylesheet" href="./node_modules/svelte-material-ui/bare.css" />

<script lang="ts">
	import DudeCard from "./dude-praise.svelte"
	import Card from '@smui/card'
	let x = 0
	let y = 0
	let bg_pos = `background-position: ${x}px ${y}px`
	function handleMouse(event){
		x = parseInt(event.clientX / 100)
		y = parseInt(event.clientY / 100)
		bg_pos = `background-position: ${x}px ${y}px`
	}

</script>

<style type="text/css">
    body, main { 
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .bg {
    	height: 100%;
     	margin-left: -30px;
     	margin-top: -30px;
     	margin-right: -30px;
    	align-self: center;
        background-size: 120% auto;
        background-repeat: no-repeat;
        background-image: url("/resources/background.jpg");
        display: flex;
        flex-direction: column;
    }
</style>

<main>
	<div on:mousemove={handleMouse} style = {bg_pos} class="bg" id="bgimg">
		<DudeCard/>
	</div>
</main>