import { get } from "svelte/store";

import { errorMessage, userFirstName } from "../store";
import { displayError } from "$lib/helper";

export function capitaliseFirstLetter(): boolean {
    let str = get(userFirstName)
    
    const trimmed = str.trim();

    if (!str) {
        errorMessage.set(displayError('Unexpected error: variable `str` is undefined.'));
        return false;
    }

    if (trimmed === '') {
        errorMessage.set(displayError('Please enter a name'));
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
        errorMessage.set(displayError('Name should only contain letters and spaces.'));
        return false;
    }

    const capitalisedFirstLetter = trimmed.at(0)?.toUpperCase();
    userFirstName.set(capitalisedFirstLetter + trimmed.slice(1))

    // clear old error if successful
    errorMessage.set('');
    return true;
}