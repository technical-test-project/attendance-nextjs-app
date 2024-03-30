import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, {AuthOptions} from "next-auth";
import {apiLogin} from "@/api/login";
import StorageManager from "@/utils/storageManager";


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials

                const response = await apiLogin({
                    email: credentials?.email,
                    password: credentials?.password,
                })

                const data = response.data

                if (data) {
                    console.log(response)
                    StorageManager.setToken(data?.accessToken?.token)
                    return data.user
                }else {
                    return null
                }

            }
        })
    ],
    callbacks: {
        async session({ session, token, user}){
            const name = "Callback Next Auth - Session"
            console.log(name, `Session ${session}`)
            console.log(name, `token ${token}`)
            console.log(name, `user ${user}`)

            return { ...token, ...user}
        },
        // async redirect({ url, baseUrl }) {
        //     const name = "Callback Next Auth - redirect"
        //     console.log(name, `url ${url}`)
        //     console.log(name, `baseUrl ${baseUrl}`)
        //     return baseUrl
        // },
    },
}

export default NextAuth(authOptions)
