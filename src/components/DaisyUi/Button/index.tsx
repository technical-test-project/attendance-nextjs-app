import React from "react";

interface Props {
    text: string | undefined;
    className?: string
    type?: string;
    onClick?: EventHandlerInterface;
}

export default function DaisyUiComponent(props: Props) {

    const defaultClassName = "btn bg-blue-500 hover:bg-blue-400 text-white"
    const className = props.className ? `${defaultClassName} ${props.className}` : defaultClassName

    return <>
        <button
            type={props.type === "submit" ? "submit" : "button"}
            className={className}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    </>
}
