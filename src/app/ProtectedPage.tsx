'use client'

import React, {useEffect, useState} from "react";
import axiosInstance from "@/lib/axios";
import {usePathname, useRouter} from "next/navigation";

interface Props {
    children: React.ReactNode
}


export default function ProtectedPage(props: Props) {
    const pathname = usePathname()
    const router = useRouter()
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axiosInstance.get('/profile')
                /**
                 * Authenticated
                 */
                if (response.status !== 401) {
                    setAuthenticated(true)

                    // If authenticated, but access login page is redirect back
                    if (pathname === '/login') {
                        router.push('/')
                    }
                }
            }catch (e) {
                setAuthenticated(false)
                router.push('/login')
            }
        }

        checkAuth()
    }, [])

    return <>{props.children}</>
}