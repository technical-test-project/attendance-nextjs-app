'use client'

import React from "react";
import DashboardPage from "@/pages/DashboardPage";
import { DaisyUiBaseLayout, DaisyUiNavbarSidebar, DaisyUiFooter } from "@/components/DaisyUi";


const Page = () => {
    return <>
        <title>Dashboard</title>
        {/* Base Layout */}
        <DaisyUiBaseLayout>

            {/* Navbar + Sidebar */}
            <DaisyUiNavbarSidebar/>

            {/* Content Page */}
            <DashboardPage/>

            {/* Footer */}
            <DaisyUiFooter/>

        </DaisyUiBaseLayout>
    </>
};

export default Page;