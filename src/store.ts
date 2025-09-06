// global shared state lives here

import { writable } from 'svelte/store';

export const userFirstName = writable("") // string type (ts recognises the return of writeable() as Writable<String>)

export const errorMessage = writable("");


export interface ReturnPackage {
    height: string,
    width: string,
    depth: string,
    volume: number
}


export const pack = writable<ReturnPackage>({ height: "", width: "", depth: "", volume: 0}) //the name "package" is taken in strict mode