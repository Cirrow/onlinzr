<script>
    let name = $state('')
</script>

<div id="inputDiv" class="flex justify-center items-center border border-gray-500">
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

<style>
    #inputDiv {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(50%, 50%);
    }
</style>



