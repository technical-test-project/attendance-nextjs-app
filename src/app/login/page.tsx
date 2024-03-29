'use client'

import LoginPage from "@/pages/LoginPage";
import { DaisyUiBaseLayout, DaisyUiFooter } from "@/components/DaisyUi"
import React from "react";


export default function Page(){
    return <>
        <title>Login</title>
        {/* Base Layout */}
        <DaisyUiBaseLayout>
            {/* Content Page */}
            <LoginPage/>
            {/* Footer */}
            <DaisyUiFooter/>
        </DaisyUiBaseLayout>
    </>
}
