<script lang="ts">
    import '../app.css';
    import { page } from '$app/state';
    import Header from '../components/Header.svelte';

    let { children } = $props();

    function goBack() {
        history.back();
    }
</script>

<Header />

<div id="background" class="flex flex-col items-center">

    <div id="title" class="flex justify-center align-middle w-full">
        <h1>ONLINZ Returns</h1>
    </div>

    <div id="inputDiv" class="flex flex-col justify-center items-center border rounded-lg p-20 border-gray-500 shadow-sm shadow-black max-w-3xl">
        {@render children()}
    </div>

    {#if page.url.pathname !== "/"}
        <!-- Back button -->
        <button onclick={goBack} class="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ← Back
        </button>
    {/if}

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

    #inputDiv {
        position: relative;
        top: 300px;
    }
</style>