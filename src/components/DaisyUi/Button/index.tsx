import React from "react";

interface Props {
    className?: string
    type?: any;
    text: string | undefined;
    disabled?: boolean;
    hidden?: boolean;
    isLoading?: boolean;
    onClick?: EventHandlerInterface;
    children?: React.ReactNode
}

export default function DaisyUiComponent(props: Props) {

    const loadingClassName = "btn bg-base-300 hover:bg-base-200 text-white"
    const defaultClassName = props.isLoading ? loadingClassName : "btn bg-blue-500 hover:bg-blue-400 text-white"
    const className = props.className ? `${defaultClassName} ${props.className}` : defaultClassName

    return <>
        <button
            className={className}
            disabled={props.isLoading || props.disabled}
            autoFocus={!props.isLoading}
            hidden={props.hidden}
            onClick={props.onClick}
        >
            {props.isLoading ? '' : props.text}
            {props.children}

            {props.isLoading
                ? ( <>
                        <span className="loading loading-spinner"></span>
                        loading
                    </>
                )
                : null
            }
        </button>
    </>
}
