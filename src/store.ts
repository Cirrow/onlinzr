// global shared state lives here

import { writable } from 'svelte/store';

export const userFirstName = writable("") // string type (ts recognises the return of writeable() as Writable<String>)

export const errorMessage = writable("");
