<link rel="stylesheet" href="./node_modules/svelte-material-ui/bare.css" />

<script lang="ts">
	import DudeCard from "./dude-praise.svelte"
	import Card from '@smui/card'

</script>

<style type="text/css">
    body { 
        background-color: lightseagreen;
        background-image: url("/resources/background.jpg");
        background-repeat: no-repeat;
        background-size: auto;
        background-position: center;
        height: 1000px;
        filter: blur(5px);
    }
</style>

<main>
	<div class="bg"></div>
	<DudeCard />
</main>
