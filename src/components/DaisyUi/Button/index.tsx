import React from "react";
import {type} from "node:os";

interface Props {
    className?: string
    text: string | undefined;
    disabled?: boolean;
    hidden?: boolean;
    onClick?: EventHandlerInterface;
    children?: React.ReactNode
}

export default function DaisyUiComponent(props: Props) {

    const defaultClassName = "btn bg-blue-500 hover:bg-blue-400 text-white"
    const className = props.className ? `${defaultClassName} ${props.className}` : defaultClassName

    return <>
        <button
            className={className}
            disabled={props.disabled}
            hidden={props.hidden}
            onClick={props.onClick}
        >
            {props.text}
            {props.children}
        </button>
    </>
}
