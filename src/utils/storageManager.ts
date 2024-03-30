export default class StorageManager {
    static clearToken(): void {
        localStorage.removeItem('token')
    }

    static getToken(): string {
        let token = localStorage.getItem('token')
        return JSON.parse(token)
    }
    static setToken(token: string) {
        localStorage.setItem('token', JSON.stringify(token))
    }
}