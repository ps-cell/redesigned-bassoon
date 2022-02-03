<link rel="stylesheet" href="./node_modules/svelte-material-ui/bare.css" />

<script lang="ts">
  import Login from "./Login.svelte"
	import DudeCard from "./dude-praise.svelte"
	import ShowCase from "./card_showcase.svelte"
	let x = 0
	let y = 0
	let bg_pos = `background-position: ${x}px ${y}px`
	function handleMouse(event){
		x = event.clientX / 80
		y = event.clientY / 80
		bg_pos = `background-position: ${x}px ${y}px`
	}

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
        /*
        margin-left: -30px;
        margin-top: -30px;
        margin-right: -30px;
        */
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
    <Login />
    <ShowCase/>
  </div>
</main>

