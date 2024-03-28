import React from "react";

interface DaisyUiBaseLayoutProps {
    theme?: string
    children: React.ReactNode
}

const DaisyUiBaseLayout: React.FC<DaisyUiBaseLayoutProps> = (props: DaisyUiBaseLayoutProps) => {

    return (
        <main data-theme={props.theme ?? "dim"}>
            {props.children}
        </main>
    )
}

export default DaisyUiBaseLayout

