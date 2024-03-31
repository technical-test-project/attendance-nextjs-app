'use client'

import {DaisyUiBaseLayout, DaisyUiContentPageLayout, DaisyUiFooter, DaisyUiNavbarSidebar} from "@/components/DaisyUi";
import React from "react";
import UserDetailPage from "@/pages/UserPage/detail";
import UserEditPage from "@/pages/UserPage/edit";

export default function Page() {

    return (<>
        <title>Edit Users</title>
        {/* Base Layout */}
        <DaisyUiBaseLayout>

            {/* Navbar + Sidebar */}
            <DaisyUiNavbarSidebar/>

            {/* Content Page Layout */}
            <DaisyUiContentPageLayout titlePage={"Edit Users"}>

                {/* Page */}
                <UserEditPage/>

            </DaisyUiContentPageLayout>

            {/* Footer */}
            <DaisyUiFooter/>

        </DaisyUiBaseLayout>
    </>);
}
