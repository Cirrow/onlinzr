<script lang="ts">
	import '../app.css';
    import Header from '../components/Header.svelte';
	
	let { children } = $props();
</script>

<Header />

<div id="background">

    <div id="title" class="flex justify-center align-middle">
        <h1>ONLINZ Returns</h1>
    </div>

    {@render children()}
</div>

<style>
    #background {
        min-width: 100vw;
        min-height: 100vh;
    }

    :global(body) {
		background-color: #f2eee2;
		color: #0084f6;
		transition: background-color 0.3s
	}
	:global(body.dark-mode) {
		background-color: #181818;
		color: #bfc2c7;
	}
</style>