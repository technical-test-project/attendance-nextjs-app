'use client'

import React, {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {apiProfile} from "@/api/users";

interface Props {
    children: React.ReactNode
}


export default function ProtectedPage(props: Props) {
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await apiProfile()
                /**
                 * Authenticated
                 */
                if (response.data) {
                    // If authenticated, but access login page is redirect back
                    if (pathname === '/login') {
                        router.push('/')
                    }
                }
            } catch (e) {
                router.push('/login')
            }
        }

        checkAuth()
    }, [])

    return <>{props.children}</>
}