export function getAllCookie() {
    const cookies = document.cookie

    if (cookies) {
        return cookies.split(';')
            .map(cookie => {
                const [name, value] = cookie.split('=')
                return { name, value }
            })
    }

    return []
}

export function getCookie(name: string) {
    return document.cookie.split(`${name}=`)[1] ?? null
}

export function setCookie(name: string, value: string, expiry?: number | null) {
    document.cookie = `${name}=${value}; max-age=${expiry}`
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; max-age=-1`
}