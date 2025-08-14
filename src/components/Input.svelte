<script lang="ts">
    import Icon from "./Icon.svelte";
    import { userFirstName } from "../store";

    let name = $state('')
    let errorMessage = $state('')

    function displayError(message: string) {
        errorMessage = message
    }

    export function capitaliseFirstLetter(str: string) {

        const trimmed = str.trim()

        if (!str) displayError('Unforseen error occured. variable str in capitaliseFirstLetter is undefined.') // just in case

        if (trimmed === '') {
            displayError('Please enter a name')
            return
        }
        
        // Check if name contains only letters and spaces, using regex
        if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
            displayError('Name should only contain letters and spaces.')
            return
        }
        
        // Clear any previous error
        errorMessage = ''
        
        if (/^[a-z]/.test(trimmed)) { // first letter is lowercase?
            const capitalisedFirstLetter = trimmed.at(0)?.toUpperCase() // capitalise first letter
            
            $userFirstName = capitaliseFirstLetter + trimmed.slice(1) // global variable to sture userfirstname
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            capitaliseFirstLetter(name)
        }
    }
</script>

<div id="inputDiv" class="flex flex-col justify-center items-center border rounded-lg p-20 border-gray-500 shadow-sm shadow-black">
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
            <div id="innerErrorDiv" class="text-red-500 mt-2">
                <span>
                    <Icon id="errorIcon" name="warnTriangle" />
                </span>
                {errorMessage}
            </div>
        {/if}
    </div>
</div>

<style>
#inputDiv {
    position: relative;
    height: 300px;
    top: 300px;
}
</style>