'use client'

import {DaisyUiBaseLayout, DaisyUiContentPageLayout, DaisyUiFooter, DaisyUiNavbarSidebar} from "@/components/DaisyUi";
import React from "react";
import UserDetailPage from "@/pages/UserPage/detail";

export default function Page() {

    return (<>
        <title>Detail Users</title>
        {/* Base Layout */}
        <DaisyUiBaseLayout>

            {/* Navbar + Sidebar */}
            <DaisyUiNavbarSidebar/>

            {/* Content Page Layout */}
            <DaisyUiContentPageLayout titlePage={"Users"}>

                {/* Page */}
                <UserDetailPage/>

            </DaisyUiContentPageLayout>

            {/* Footer */}
            <DaisyUiFooter/>

        </DaisyUiBaseLayout>
    </>);
}
