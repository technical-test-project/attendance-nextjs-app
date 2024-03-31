'use client'

import {DaisyUiBaseLayout, DaisyUiContentPageLayout, DaisyUiFooter, DaisyUiNavbarSidebar} from "@/components/DaisyUi";
import React from "react";
import UserCreatePage from "@/pages/UserPage/create";

export default function Page() {

    return (<>
        <title>Create Users</title>
        {/* Base Layout */}
        <DaisyUiBaseLayout>

            {/* Navbar + Sidebar */}
            <DaisyUiNavbarSidebar/>

            {/* Content Page Layout */}
            <DaisyUiContentPageLayout titlePage={"Create Users"}>

                {/* Page */}
                <UserCreatePage/>

            </DaisyUiContentPageLayout>

            {/* Footer */}
            <DaisyUiFooter/>

        </DaisyUiBaseLayout>
    </>);
}
