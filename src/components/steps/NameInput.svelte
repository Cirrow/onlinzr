<script lang="ts">
  import { userFirstName } from "../../store";
</script>

<div id="innerinputdiv" class="flex flex-col items-center">
    <span class="pb-10">Please type your first name.</span>
    <input
        id="name"
        bind:value={$userFirstName}
        type="text"
        placeholder="Type your name here..."
        class="border border-gray-400 p-2 rounded top-3"
    />
</div>
