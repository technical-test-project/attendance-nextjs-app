const bearerTokenKey = 'bearerToken'
const userKey = 'user'

export default class StorageManager {


    static clearStorage(): void {
        localStorage.clear()
    }


    /**
     * BearerToken
     */
    static getBearerToken(): string {
        return JSON.parse(localStorage.getItem(bearerTokenKey))
    }
    static setBearerToken(token: string) {
        localStorage.setItem(bearerTokenKey, JSON.stringify(token))
    }

    /**
     * User
     * @param user
     */
    static setUser(user: User) {
        localStorage.setItem(userKey, JSON.stringify(user))
    }
    static getUser(): User {
        return JSON.parse(localStorage.getItem(userKey))
    }
}