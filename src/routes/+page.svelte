<script lang="ts">
    import { errorMessage, boxDim, userFirstName, fromIsland, customerFullDetails } from "../store";
    import { alterBaseRate, capitaliseFirstLetter, validateDimensions, validateFullInfo } from "$lib/validation";

    import ErrorDiv from "../components/ErrorDiv.svelte";

    import Dimensions from "../components/steps/Dimensions.svelte";
    import NameInput from "../components/steps/NameInput.svelte";
    import Island from "../components/steps/Island.svelte";
    import Details from "../components/steps/Details.svelte";

    let currentStep = $state(1);

    const steps = [
        { no: 1, id: "name",       component: NameInput },
        { no: 2, id: "dimensions", component: Dimensions },
        { no: 3, id: "island",     component: Island},
        { no: 4, id: "details",    component: Details}
    ]; // individual components to be swapped out as the steps (procedure for return) increment
    const totalSteps = steps.length;

    // --- helper navigation functions ---
    export function nextStep(): void {
        if (currentStep < totalSteps && canProceed(currentStep)) {
            errorMessage.set("")
            currentStep++;
        }
        if (currentStep === totalSteps) {
            canProceed(currentStep)
            return
        }
    }

    export function prevStep(): void {
        if (currentStep > 1) {
            currentStep--;
            errorMessage.set("")
        }
    }

    export function navStep(step: number): void {
        if (step >= 1 && step <= totalSteps && canProceed(step - 1)) {
            currentStep = step;
        }
    }

    
    function canProceed(step: number): boolean {
        
        // Handle each step case explicitly with proper typing
        if (step === 1) { // name step
            const nameInput = $userFirstName;
            return capitaliseFirstLetter(nameInput);
        } else if (step === 2) { // dimensions step  
            const packInput = $boxDim;
            return validateDimensions(packInput);
        } else if (step === 3) {
            const island = $fromIsland
            return alterBaseRate(island)
        } else if (step === 4) {
            const fullDetails = $customerFullDetails
            return validateFullInfo(fullDetails)
        }
        return false;
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
    <button onclick={nextStep}  class="p-3 rounded-md bg-blue-100">
        Next
    </button>
</div>


