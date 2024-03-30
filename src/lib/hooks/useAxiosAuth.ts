'use client'

import {useSession} from "next-auth/react";

const useAxiosAuth = () => {
    const {data} = useSession()
}