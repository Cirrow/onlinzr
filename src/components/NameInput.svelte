<script lang="ts">
    import Icon from "./Icon.svelte";
    import { userFirstName } from "../store";
    import { goto } from '$app/navigation';


    let name = $state('')
    let errorMessage = $state('')

    function displayError(message: string) {
        errorMessage = message
    }

    export function capitaliseFirstLetter(str: string) {
        const trimmed = str.trim();

        if (!str) {
            displayError('Unforeseen error occurred. variable str in capitaliseFirstLetter is undefined.');
            return;
        }

        if (trimmed === '') {
            displayError('Please enter a name');
            return;
        }

        // name must only contain letters and spaces
        if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
            displayError('Name should only contain letters and spaces.');
            return;
        }

        // clear any previous error
        errorMessage = '';

        const capitalisedFirstLetter = trimmed.at(0)?.toUpperCase();
        $userFirstName = capitalisedFirstLetter + trimmed.slice(1);

        // Navigate to next step
        goto('/packageinfo')
    }


    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            capitaliseFirstLetter(name)
        }
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
        onkeydown={handleKeydown}
    />
</div>
<div id="errorDiv">
    {#if errorMessage}
        <div id="innerErrorDiv" class="text-red-500 mt-2 flex">
            <span>
                <Icon id="errorIcon" name="warnTriangle" />
            </span>
            {errorMessage}
        </div>
    {/if}
</div>

