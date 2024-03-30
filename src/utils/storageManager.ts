const bearerToken = "oat_Mw.Mm0wdVFJRXlfQjNUNUxwZVVsam16eE5TbUR3RnhKY2djbEY4Ull6bjQwNDcwOTE4MTY"

export default class StorageManager {
    static clearToken(): void {
        localStorage.removeItem('token')
    }

    static getToken(): string {
        let token = localStorage.getItem('token')
        return JSON.parse(token)
    }
    static setToken(token: string) {
        // TODO - Dont forget to remove
        token = bearerToken
        localStorage.setItem('token', JSON.stringify(token))
    }
}