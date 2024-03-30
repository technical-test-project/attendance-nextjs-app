import React from "react";

interface Props {
    values: number[];
    className?: string;
    onChange?: EventHandlerInterface;
    onSelect?: EventHandlerInterface;
}


export default function DaisyUiComponent(props: Props) {

    const defaultClassName = "select max-w-xs max-h-dvh focus:border-neutral"
    const className = props.className ? `${defaultClassName} ${props.className}` : defaultClassName

    return <>
        <select className={className}
                onChange={props.onChange}
                onSelect={props.onSelect}>
            {props.values.map((item, index) => (<option key={item}>{item}</option>))}
        </select>
    </>;
}
