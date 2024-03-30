'use client'

import {DaisyUiBaseLayout, DaisyUiFooter, DaisyUiNavbarSidebar, DaisyUiContentPageLayout} from "@/components/DaisyUi";
import DashboardPage from "@/pages/DashboardPage";
import React from "react";

export default function Home() {
    return (<>
        <title>Dashboard</title>
        {/* Base Layout */}
        <DaisyUiBaseLayout>

            {/* Navbar + Sidebar */}
            <DaisyUiNavbarSidebar/>

            {/* Content Page Layout */}
            <DaisyUiContentPageLayout titlePage={"Dashboard"}>

                {/* Page */}
                <DashboardPage/>

            </DaisyUiContentPageLayout>

            {/* Footer */}
            <DaisyUiFooter/>

        </DaisyUiBaseLayout>
    </>);
}
