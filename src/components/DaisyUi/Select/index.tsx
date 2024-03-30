import React from "react";

interface Props {
    value?: string
    items: number[];
    className?: string;
    onChange?: EventHandlerInterface;
    onSelect?: EventHandlerInterface;
}


export default function DaisyUiComponent(props: Props) {

    const defaultClassName = "select max-w-xs max-h-dvh focus:border-neutral"
    const className = props.className ? `${defaultClassName} ${props.className}` : defaultClassName

    return <>
        <select className={className}
                value={props.value}
                onChange={props.onChange}
                onSelect={props.onSelect}>
            {props.items.map((item, index) => (<option key={item}>{item}</option>))}
        </select>
    </>;
}
