// global shared state lives here

import { writable } from 'svelte/store';

export const userFirstName = writable("") // string type (ts recognises the return of writeable() as Writable<String>)

export const errorMessage = writable("");


export interface ReturnPackage {
    height: string,
    width: string,
    depth: string,
}

export const boxDim = writable<ReturnPackage>({ height: "", width: "", depth: "" })
export const boxVol = writable(0)


export type Islands = "north" | "south" | "stewart"

export const fromIsland = writable<Islands>()