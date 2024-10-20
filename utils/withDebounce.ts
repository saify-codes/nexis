
let withDebounceTimerId: number | any = null
export function withDebounce(fn: Function, interval: number = 500) {
    clearTimeout(withDebounceTimerId)
    withDebounceTimerId = setTimeout(fn, interval)
}