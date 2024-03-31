import React from "react";

interface Props {
    theme?: string
    children: React.ReactNode
}

export default function DaisyUiComponent(props: Props) {
    return <>
        <main data-theme={props.theme ?? "dim"}>
            {props.children}
        </main>
    </>
}