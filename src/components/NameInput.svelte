<script lang="ts">
    import { userFirstName } from "../store";
    import { displayError, handleKeydown } from "$lib/helper";
    import { capitaliseFirstLetter } from "$lib/validation";

    let name = $state('');

    
</script>

<div id="innerinputdiv" class="flex flex-col items-center">
    <span class="pb-10">Please type your first name.</span>
    <input
        id="name"
        bind:value={name}
        type="text"
        placeholder="Type your name here..."
        class="border border-gray-400 p-2 rounded top-3"
        onkeydown={(e) => $userFirstName = name}
    />
</div>
