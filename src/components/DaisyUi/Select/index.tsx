import React from "react";

interface Props {
    id: string;
    defaultValue?: any;
    items: number[] | string[] | {id: number, value: string}[] | undefined;
    className?: string;
    label?: string;
    onChange?: EventHandlerInterface;
    onSelect?: EventHandlerInterface;
}


export default function DaisyUiComponent(props: Props) {

    const defaultClassName = "select max-w-xs max-h-dvh focus:border-neutral"
    const className = props.className ? `${defaultClassName} ${props.className}` : defaultClassName


    return <>
        {props.label ? <label className="block mb-1">{props.label}</label> : null}
        <select id={props.id}
            className={className}
                value={props.defaultValue}
                onChange={props.onChange}
                onSelect={props.onSelect}>
            {props.items?.map((item, index) =>
                (typeof item === 'object' && item !== null
                        ? <option value={item.id} key={item.id}>{item.value}</option>
                        : <option value={item} key={item}>{item}</option>
                )

                // (typeof item === 'object' && item !== null
                //     ? <option value={item.id} key={item.id}>{item.value}</option>
                //     : <option value={item} key={item}>{item}</option>
                // )
            )}
        </select>
    </>;
}
