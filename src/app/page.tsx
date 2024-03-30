'use client'

import {DaisyUiBaseLayout, DaisyUiFooter, DaisyUiNavbarSidebar, DaisyUiContentPageLayout} from "@/components/DaisyUi";
import DashboardPage from "@/pages/DashboardPage";
import React from "react";
import {useSession} from "next-auth/react";

export default function Home() {

    const { data } = useSession()
    console.log(data)


    return (<>
       <p>Check Auth</p>
    </>);
}
