// Helper methods to be used throughout components
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

