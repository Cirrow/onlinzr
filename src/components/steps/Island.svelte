<script lang="ts">
    import { fromIsland, type Islands } from "../../store";

    const islands = [
        [ "north",   "North Island (Te Ika a Maui)" ],
        [ "south",   "South Island (Te Wai Ponamu)" ],
        [ "stewart", "Stewart Island (Rakiura)"     ]
    ] // short name followed by a longer, full name

    let currentSelection: Islands = $state("north"); // reactive default value

    $effect.pre(() => {
        $fromIsland = currentSelection
    })

</script>


<div class="flex flex-col items-center">

    <span class="pb-10">Which of the three big islands will the product be returned from?</span>


    <form>
        <label for="island">Choose an island:</label>
        <select 
            name="island" 
            id="select-island" 
            class="border-b p-4 rounded-md"
            bind:value={currentSelection}
        >
            {#each islands as island}
                <option value={island[0]}>{island[1]}</option>
            {/each}
        </select>
    </form>
</div>