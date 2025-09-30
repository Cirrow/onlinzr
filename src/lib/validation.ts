// boolean functions to validate the user inputs, and setting the global variables
// these functions require ARGUMENTS as they should be independently tested in an EXTERNAL environemnt like vitest - they will not have access to global variables.

import { errorMessage, userFirstName, boxDim, boxVol, type ReturnPackage, baseRate, type Islands, customerFullDetails, type Address, type FullDetail } from "../store";
import { calculateBaseRate, calculateVolume } from "$lib/helper";
import { get } from "svelte/store";

export function capitaliseFirstLetter(name: string): boolean {
    let str = name
    
    const trimmed = str.trim();

    if (trimmed === '') {
        errorMessage.set('Please enter a name')
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
        errorMessage.set('Name should only contain letters and spaces.')
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
        errorMessage.set('Dimensions must not be blank.')
        return false; // blank check
    }

    [h, w, d] = [h, w, d].map(v => v.toLowerCase());

    if ( [h, w, d].some( v => /[a-zA-Z]/.test(v) && !v.endsWith("cm") ) ) { // contains letters but doesnt end in "cm"?
        errorMessage.set('Dimensions includes any other letters other than the units, or has invalid formatting.')
        return false
    }

    if ([h, w, d].every(v => !Number.isNaN(Number(v.endsWith("cm") ? v.slice(0, -2) : v)))) { // valid dimension, with or without "cm"?
        
        [h, w, d] = [h, w, d].map(v => v.endsWith("cm") ? v.slice(0, -2) : v)
        const [hnum, wnum, dnum] = [h, w, d].map(Number)

        if (hnum < 5 || wnum < 5 || dnum < 5) {
            errorMessage.set('All dimensions must not be smaller than 5cm.')
            return false
        }
        if (hnum > 100 || wnum > 100 || dnum > 100) {
            errorMessage.set('All dimensions must not exceed 100cm.')
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

    errorMessage.set("")

    let str = name
    const trimmed = str.trim();

    if (trimmed === '') {
        errorMessage.set('Please enter a name')
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
        errorMessage.set('Name should only contain letters and spaces.')
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
        errorMessage.set("Telephone number contains non-numeric characters.")
    }
}

export function validateAddress({street, city, region, postal}: Address): boolean {

    if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9\s]+$/.test(street)) {
        errorMessage.set(("Street does not include a house number, and/or is malformed."))
        return false
    }

    if (!/^[A-Za-z]+$/.test(city)) {
        errorMessage.set(("City should contain only letters."))
        return false
    }
    
    if (!/^[A-Za-z]+$/.test(region)) {
        errorMessage.set(("Region should contain only letters."))
        return false
    }

    if (/[^0-9]/.test(postal) || postal.length !== 4) {
        errorMessage.set(("Postal code is in an invalid format"))
        return false
    }

    customerFullDetails.update(d => ({
        ...d,
        address: {
            ...d.address,
            street: street.toUpperCase(),
            city: city.toUpperCase(),
            region: region.toUpperCase()
        }
    }))
    return true
}

export function validateFullInfo(fullDetails: FullDetail): boolean {
    errorMessage.set("")

    if (!capitaliseAllLastName(fullDetails.lastName)) return false;
    if (!validateAddress(fullDetails.address)) return false;

    printData()
    return true

}


export function printData() {
 
    const fullDetails = get(customerFullDetails)

    const toPrint = 
    `Full name: ${fullDetails.firstName} ${fullDetails.lastName}
Address: ${fullDetails.address.street} ${fullDetails.address.city} ${fullDetails.address.region} ${fullDetails.address.postal}
Telephone: ${fullDetails.telephone}
Cost for return by courier: $${fullDetails.costForReturn}`

    alert(toPrint)
}