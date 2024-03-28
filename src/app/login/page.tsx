'use client'

import LoginPage from "@/pages/LoginPage";
import DaisyUiBaseLayout from "@/components/DaisyUi/Layout";
import DaisyUiFooter from "@/components/DaisyUi/Layout/Footer";
import React from "react";

const Page = () => {
    return <>
        <title>Login</title>
        <DaisyUiBaseLayout theme={"dim"}>
            <LoginPage/>
            <DaisyUiFooter/>
        </DaisyUiBaseLayout>
    </>
};

export default Page;