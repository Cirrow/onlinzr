<script lang="ts">
    import Icon from "./Icon.svelte";
    import { userFirstName } from "../store";
    import { goto } from '$app/navigation';
    import { displayError, handleKeydown } from "$lib/helper";
    import ErrorDiv from "./ErrorDiv.svelte";


    let name = $state('')

    let errorMessage = $state('')

    export function capitaliseFirstLetter(str: string) {
        const trimmed = str.trim();

        if (!str) {
            errorMessage = displayError('Unforeseen error occurred. variable str in capitaliseFirstLetter is undefined.');
            return;
        }

        if (trimmed === '') {
            errorMessage = displayError('Please enter a name');
            return;
        }

        // name must only contain letters and spaces
        if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
            errorMessage = displayError('Name should only contain letters and spaces.');
            return;
        }

        const capitalisedFirstLetter = trimmed.at(0)?.toUpperCase();
        $userFirstName = capitalisedFirstLetter + trimmed.slice(1);

        // Navigate to next step
        goto('/packageinfo')
    }


    
</script>

<div id="innerinputdiv" class="flex flex-col items-center">
    <span class="pb-10">Please type your first name.</span>
    <input
        id="name"
        bind:value={name}
        type="text"
        placeholder="Type your name here..."
        class="border border-gray-400 p-2 rounded top-3"
        onkeydown={(e) => handleKeydown(e, "Enter", capitaliseFirstLetter, name)}
    />
</div>
{#if errorMessage}
    <ErrorDiv {errorMessage} />
{/if}