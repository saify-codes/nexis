
export async function withLoader(fn: Function, dispatcher: Function) {
    try {
        dispatcher(true)
        await fn()
    } finally {
        dispatcher(false)
    }
}