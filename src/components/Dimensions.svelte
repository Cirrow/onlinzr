<script lang="ts">
    import { userFirstName, pack } from "../store";
</script>


<div class="flex flex-col items-center">

    <span class="pb-10">Hi {$userFirstName}, please enter the height of the box, in centimetres, that you will return the product in. (e.g. "42" or "42cm")</span>

    <input
        id="heightInput"
        bind:value={$pack.height}
        type="text"
        placeholder="Enter the height here..."
        class="border border-gray-400 p-2 rounded top-3 mb-4"
    />

    <input
        id="widthInput"
        bind:value={$pack.width}
        type="text"
        placeholder="Enter the width here..."
        class="border border-gray-400 p-2 rounded top-3 mb-4"
    />

    <input
        id="depthInput"
        bind:value={$pack.depth}
        type="text"
        placeholder="Enter the depth here..."
        class="border border-gray-400 p-2 rounded top-3 mb-4"
    />
</div>