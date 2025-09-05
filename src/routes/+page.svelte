<script lang="ts">
    import { errorMessage } from "../store";
    import { capitaliseFirstLetter } from "$lib/validation";

    import ErrorDiv from "../components/ErrorDiv.svelte";
    import Dimensions from "../components/Dimensions.svelte";
    import NameInput from "../components/NameInput.svelte";

    let currentStep = $state(1);

    const steps = [
        { no: 1, id: "name",       component: NameInput, checkFn: capitaliseFirstLetter },
        { no: 2, id: "dimensions", component: Dimensions },
    ]; // individual components to be swapped out as the steps (procedure for return) increment
    const totalSteps = steps.length;

    // --- helper navigation functions ---
    export function nextStep(): void {
        if (currentStep < totalSteps && canProceed(currentStep)) {
            currentStep++;
        }
    }

    export function prevStep(): void {
        if (currentStep > 1) {
            currentStep--;
        }
    }

    export function navStep(step: number): void {
        if (step >= 1 && step <= totalSteps && canProceed(step - 1)) {
            currentStep = step;
        }
    }

    function canProceed(step: number): boolean {
        const stepConfig = steps[step - 1]; // because steps array is 0-indexed
        if (stepConfig?.checkFn) {
            return stepConfig.checkFn();
        }
        return true;
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault(); // avoid submitting forms or unwanted behavior
            nextStep();
        }
    }


</script>

<div id="StepContainer">
    <svelte:component this={steps[currentStep - 1].component} />
</div>

{#if $errorMessage !== ""}
    <ErrorDiv />
{/if}

<div class="flex gap-4 mt-10">
    {#if (currentStep !== 1)}
        <button onclick={prevStep}>Back</button>
    {/if}
    <button onclick={nextStep} disabled={currentStep === totalSteps} class="p-3 rounded-md bg-blue-100">
        Next
    </button>
</div>


