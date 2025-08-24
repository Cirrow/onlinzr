<script>
    let { errorMessage } = $props()
    import Icon from "./Icon.svelte";
</script>

<div id="errorDiv">
        <div id="innerErrorDiv" class="text-red-500 mt-2 flex">
            <span>
                <Icon id="errorIcon" name="warnTriangle" />
            </span>
            {errorMessage}
        </div>
</div>