import { boxVol, type ReturnPackage } from "../store";

// helper methods to be used throughout components
export function displayError(message: string) {
    let errorMessage: string
    return errorMessage = message
}
export function handleKeydown( event: KeyboardEvent, key: string, fnToRun: (() => void) | ((val: string) => void), value?: string ) {
    
    if (event.key === key) {
        
        if (fnToRun.length === 0) {
            (fnToRun as () => void)();
        } else {
            (fnToRun as (val: string) => void)(value ?? "");
        }
  }
}

export function calculateVolume(h: number, w: number, d: number) {
    return h * w * d
}

export function calculateBaseRate(height: number, width: number, depth: number) {
    
    const volume = calculateVolume(height, width, depth)

    if (volume <= 6000) {
        return 8
    } else if (volume < 100000 && volume > 6000) {
        return 12
    } else {
        return 15
    }

}