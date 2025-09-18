// global shared state lives here

import { writable, get } from 'svelte/store';

export const userFirstName = writable("") // string type (ts recognises the return of writeable() as Writable<String>)

export const errorMessage = writable("");


export interface ReturnPackage {
    height: string,
    width: string,
    depth: string,
} // string type to capture user INPUT.

export const boxDim = writable<ReturnPackage>({ height: "", width: "", depth: "" })
export const boxVol = writable(0)
export const baseRate = writable(0)


export type Islands = "north" | "south" | "stewart"

export const fromIsland = writable<Islands>()


export interface Address {
    street: string,
    city: string,
    region: string,
    postal: string
}

export interface FullDetail {
    firstName: string,
    lastName: string,
    address: Address,
    telephone: string,
    costForReturn: number
}

export const customerFullDetails = writable<FullDetail>({
    firstName: get(userFirstName),
    lastName: "",
    address: {street: "", city: "", region: "", postal: ""},
    telephone: "",
    costForReturn: 0
})

// Keep firstName in sync with userFirstName
userFirstName.subscribe(firstName => {
  customerFullDetails.update(details => ({
    ...details,
    firstName: firstName
  }))
})

baseRate.subscribe(rate => {
    customerFullDetails.update(details => ({
        ...details,
        costForReturn: rate
    }))
})