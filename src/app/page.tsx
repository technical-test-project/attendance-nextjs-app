'use client'

import {DaisyUiBaseLayout, DaisyUiFooter, DaisyUiNavbarSidebar, DaisyUiPageContentLayout} from "@/components/DaisyUi";
import DashboardPage from "@/pages/DashboardPage";
import React from "react";

export default function Dashboard() {
    return (<>
        <title>Dashboard</title>
        {/* Base Layout */}
        <DaisyUiBaseLayout>

            {/* Navbar + Sidebar */}
            <DaisyUiNavbarSidebar/>

            {/* Content Page */}
            <DaisyUiPageContentLayout titlePage={"Dashboard"}>
                <DashboardPage/>
            </DaisyUiPageContentLayout>

            {/* Footer */}
            <DaisyUiFooter/>

        </DaisyUiBaseLayout>
    </>);
}
