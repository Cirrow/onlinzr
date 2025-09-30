<script lang="ts">
    import { customerFullDetails, errorMessage } from "../../store";
    errorMessage.set("")

</script>


<div class="flex flex-col items-center">

    <span class="pb-10">Lastly, please enter your last name, your address, and your telephone number below.</span>

        <div class="flex flex-col">
            <input
                id="lastNameInput"
                bind:value={$customerFullDetails.lastName}
                type="text"
                placeholder="Enter last name..."
                class="border border-gray-400 p-2 rounded top-3 mb-4"
            />
            <input
                id="telephoneInput"
                bind:value={$customerFullDetails.telephone}
                type="text"
                placeholder="Enter telephone number..."
                class="border border-gray-400 p-2 rounded top-3 mb-4"
            />
        </div>

        <div class="flex flex-col w-2/3">
            <span class="">Address</span>

            <input
                id="addressStreetInput"
                bind:value={$customerFullDetails.address.street}
                type="text"
                placeholder="Enter street..."
                class="border border-gray-400 p-2 rounded top-3 mb-4"
            />
            <div class="flex">
                <input
                    id="addressCityInput"
                    bind:value={$customerFullDetails.address.city}
                    type="text"
                    placeholder="Enter city..."
                    class="border border-gray-400 p-2 rounded top-3 mb-4 mr-1 w-1/2"
                />
                <input
                    id="addressRegionInput"
                    bind:value={$customerFullDetails.address.region}
                    type="text"
                    placeholder="Enter region..."
                    class="border border-gray-400 p-2 rounded top-3 mb-4 ml-1 w-1/2"
                />
            </div>
            <input
                id="addressPostalInput"
                bind:value={$customerFullDetails.address.postal}
                type="text"
                placeholder="Enter postal code..."
                class="border border-gray-400 p-2 rounded top-3 mb-4"
            />
        </div>
        



</div>