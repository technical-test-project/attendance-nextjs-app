'use client'

import {DaisyUiBaseLayout, DaisyUiFooter, DaisyUiNavbarSidebar, DaisyUiContentPageLayout} from "@/components/DaisyUi";
import React from "react";
import AttendancePage from "@/pages/AttendancePage";
import UserPage from "@/pages/UserPage";

export default function Page() {

    return (<>
        <title>Users</title>
        {/* Base Layout */}
        <DaisyUiBaseLayout>

            {/* Navbar + Sidebar */}
            <DaisyUiNavbarSidebar/>

            {/* Content Page Layout */}
            <DaisyUiContentPageLayout titlePage={"Users"}>

                {/* Page */}
                <UserPage/>

            </DaisyUiContentPageLayout>

            {/* Footer */}
            <DaisyUiFooter/>

        </DaisyUiBaseLayout>
    </>);
}
