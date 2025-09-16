// boolean functions to validate the user inputs, and setting the global variables

import { errorMessage, userFirstName, boxDim, boxVol, type ReturnPackage } from "../store";
import { calculateBaseRate, displayError } from "$lib/helper";

export function capitaliseFirstLetter(name: string): boolean {
    let str = name
    
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


export function validateDimensions({ height, width, depth }: ReturnPackage): boolean {

    let h = height.trim();
    let w = width.trim();
    let d = depth.trim();

    if (h === "" || w === "" || d === "") {
        errorMessage.set(displayError('Dimensions must not be blank.'))
        return false // blank check
    }

    h = h.toLowerCase()
    w = w.toLowerCase()
    d = d.toLowerCase()

    if ([h, w, d].some(v => /[a-zA-Z]/.test(v) && !v.endsWith("cm"))) { // contains string but doesnt end in "cm"?
        errorMessage.set(displayError('Dimensions must not include any other letters other than the units.'))
        return false
    }

    if ([h, w, d].every(v => !Number.isNaN(Number(v.endsWith("cm") ? v.slice(0, -2) : v)))) { // valid dimension, with or without "cm"?
        [h, w, d] = [h, w, d].map(v => v.slice(0, -2))
        const [hnum, wnum, dnum] = [h, w, d].map(Number)

        if (hnum < 5 || wnum < 5 || dnum < 5) errorMessage.set(displayError('All dimensions must not be smaller than 5cm.'))
        if (hnum > 100 || wnum > 100 || dnum > 100) errorMessage.set(displayError('All dimensions must not exceed 100cm.'))


        const newDim: ReturnPackage = { height: h, width: w, depth: d }
        boxDim.set(newDim)

        const volume = calculateBaseRate(hnum, wnum, dnum)
        boxVol.set(volume) // set volume global storage

        return true
    }

    return false
}