'use client'

import {DaisyUiBaseLayout, DaisyUiFooter, DaisyUiNavbarSidebar, DaisyUiContentPageLayout} from "@/components/DaisyUi";
import React from "react";
import AttendancePage from "@/pages/AttendancePage";
import ProfilePage from "@/pages/ProfilePage";

export default function Page() {

    return (<>
        <title>Profile</title>
        {/* Base Layout */}
        <DaisyUiBaseLayout>

            {/* Navbar + Sidebar */}
            <DaisyUiNavbarSidebar/>

            {/* Content Page Layout */}
            <DaisyUiContentPageLayout titlePage={"Profile"}>

                {/* Page */}
                <ProfilePage/>

            </DaisyUiContentPageLayout>

            {/* Footer */}
            <DaisyUiFooter/>

        </DaisyUiBaseLayout>
    </>);
}
