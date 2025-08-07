<script>
    let name = $state('')
</script>

<div id="inputDiv" class="flex justify-center items-center border rounded-lg p-20 border-gray-500">
    <div id="innerinputdiv">
        <input
            id="name"
            bind:value={name}
            type="text"
            placeholder="Type your name here..."
            class="border border-gray-400 p-2 rounded"
        />
    </div>
    
</div>


