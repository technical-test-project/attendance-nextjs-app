import React from "react";

interface Props {
    titlePage: string;
    children: React.ReactNode;
}

export default function DaisyUiComponent(props: Props) {
    return <>
        <div className="min-h-screen container mx-auto py-12 px-7 sm:px-6 lg:px-6 z-0">
            <h1 className="text-3xl font-bold mb-6"> {props.titlePage} </h1>

            {props.children}
        </div>
    </>;
}

