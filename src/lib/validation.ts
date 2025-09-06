import { errorMessage, userFirstName, pack } from "../store";
import { displayError } from "$lib/helper";

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


export function validateDimensions({ heightInput, widthInput, depthInput }: { heightInput: string; widthInput: string; depthInput: string }): boolean {

    let h = heightInput.trim();
    let w = widthInput.trim();
    let d = depthInput.trim();

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

    if ( [h, w, d].every( v => v.endsWith("cm") && !Number.isNaN(Number(v.slice(0, -2))) ) ) { // ends with cm and is a valid number
        
        return true
    }

    return false
}