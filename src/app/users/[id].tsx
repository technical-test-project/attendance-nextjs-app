'use client'

import {DaisyUiBaseLayout, DaisyUiFooter, DaisyUiNavbarSidebar, DaisyUiContentPageLayout} from "@/components/DaisyUi";
import React from "react";
import UserDetailPage from "@/pages/users/[id]";

export default function Page() {


    return <>Detail Page</>

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
