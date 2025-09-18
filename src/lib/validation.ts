// boolean functions to validate the user inputs, and setting the global variables
// these functions require ARGUMENTS as they should be independently tested in an EXTERNAL environemnt like vitest - they will not have access to global variables.

import { errorMessage, userFirstName, boxDim, boxVol, fromIsland, type ReturnPackage, baseRate, type Islands, customerFullDetails, type Address } from "../store";
import { calculateBaseRate, calculateVolume, displayError } from "$lib/helper";
import { get } from "svelte/store";

export function capitaliseFirstLetter(name: string): boolean {
    let str = name
    
    const trimmed = str.trim();

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
        return false; // blank check
    }

    [h, w, d] = [h, w, d].map(v => v.toLowerCase());

    if ( [h, w, d].some( v => /[a-zA-Z]/.test(v) && !v.endsWith("cm") ) ) { // contains letters but doesnt end in "cm"?
        errorMessage.set(displayError('Dimensions includes any other letters other than the units, or has invalid formatting.'))
        return false
    }

    if ([h, w, d].every(v => !Number.isNaN(Number(v.endsWith("cm") ? v.slice(0, -2) : v)))) { // valid dimension, with or without "cm"?
        
        [h, w, d] = [h, w, d].map(v => v.endsWith("cm") ? v.slice(0, -2) : v)
        const [hnum, wnum, dnum] = [h, w, d].map(Number)

        if (hnum < 5 || wnum < 5 || dnum < 5) {
            errorMessage.set(displayError('All dimensions must not be smaller than 5cm.'));
            return false
        }
        if (hnum > 100 || wnum > 100 || dnum > 100) {
            errorMessage.set(displayError('All dimensions must not exceed 100cm.'));
            return false
        }


        boxDim.set({ height: h, width: w, depth: d });
        
        baseRate.set(calculateBaseRate(hnum, wnum, dnum))

        boxVol.set(calculateVolume(hnum, wnum, dnum)); // set volume global storage

        return true;
    }

    return false;
}


export function alterBaseRate(island: Islands): boolean {

    if (island === "south") baseRate.update(n => n * 1.5) // multiply base rate by 1.5
    if (island === "stewart") baseRate.update(n => n * 2) // multiply base rate by 2

    return true
}

export function capitaliseAllLastName(name: string): boolean {
    let str = name
    
    const trimmed = str.trim();

    if (trimmed === '') {
        errorMessage.set(displayError('Please enter a name'));
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
        errorMessage.set(displayError('Name should only contain letters and spaces.'));
        return false;
    }


    const capitalised = trimmed.toUpperCase();
    customerFullDetails.update(details => ({
        ...details,
        lastName: capitalised
    }))

    // clear old error if successful
    errorMessage.set('');
    return true;
}

export function verifyTelephone(telephone: string) {
    telephone = telephone.replace(" ", "")
    telephone = telephone.replace("-", "")

    if (/[^0-9]/.test(telephone)) {
        errorMessage.set(displayError("Telephone number ontains non-numeric characters."))
    }
}

export function validateAddress({street, city, region, postal}: Address) {

    if (!/\d/.test(street)) {
        errorMessage.set(displayError(""))
    }

}

export function validateFullInfo(lastName: string): boolean {

    if (!capitaliseAllLastName(lastName)) return false;



}