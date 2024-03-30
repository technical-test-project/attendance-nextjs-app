'use client'

import {useRouter} from "next/navigation";
import Image from "next/image";
import {DaisyUiButton, DaisyUiTextInput} from "@/components/DaisyUi";
import React, {useState} from "react";
import {apiLogin} from "@/api/login";
import StorageManager from "@/utils/storageManager";

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = useState({email: "", password: ""})
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (e: any) => {
        setUser((prev: any) => ({...prev, [e.target.id]:e.target.value}))
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await apiLogin({...user})

            const timeout = setTimeout(() => {
                if (response.data) {
                    const accessToken = response.data?.accessToken as AccessToken
                    const user = response.data?.user as User
                    StorageManager.setBearerToken(accessToken.token)
                    StorageManager.setUser(user)

                    router.push('/')
                }
            }, 1000)

            return () => clearTimeout(timeout)

        } catch (e) {
            console.log(e)
        }

    }

    return <>
        <div className="min-h-screen flex items-center justify-center py-12 px-8 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Image
                        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mx-auto mb-3"
                        src="/next.svg"
                        alt="Next.js Logo"
                        width={180}
                        height={37}
                        priority
                    />

                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">Sign in to your
                        account</h2>
                </div>
                <div className="mt-8 space-y-6">
                    <DaisyUiTextInput label={"Email"} type={"text"} id={"email"} placeholder={"Enter your email"}
                                      onChange={handleInput}
                                      required/>
                    <DaisyUiTextInput label={"Password"} type={"password"} id={"password"} placeholder={"Your password"}
                                      onChange={handleInput}
                                      required/>

                    <div className={"pt-5"}>
                        <DaisyUiButton
                            disabled={isLoading}
                            className={!isLoading ? "btn-block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500": "btn-block bg-base-200 hover:bg-base-300"}
                            text={!isLoading ? "Sign In" : ""}
                            onClick={handleSubmit}>
                            {isLoading ? (<>
                                <span className="loading loading-spinner"></span>
                                loading </>) : null }
                        </DaisyUiButton>
                    </div>
                </div>
            </div>
        </div>
    </>
}