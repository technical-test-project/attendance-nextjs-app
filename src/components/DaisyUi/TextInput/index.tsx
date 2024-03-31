import React, {ChangeEvent} from "react";

interface Props {
    id: string;
    label?: string;
    type: string;
    min?: number;
    max?: number;
    placeholder?: string;
    defaultValue?: string | number | undefined;
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    pattern?: string;
    inputMode?: "email" | "search" | "text" | "tel" | "url" | "none" | "numeric" | "decimal" | undefined;
    hidden?: boolean;
    onChange?: EventHandlerInterface;
}
export default function DaisyUiComponent(props: Props) {
    return <>
        <div className={"space-y-2"}>
            <label className="block mb-1" htmlFor={props.id}>{props.label}</label>
            <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-white bg-transparent/20"
                id={props.id}
                type={props.type}
                min={props.min}
                max={props.max}
                defaultValue={props?.defaultValue}
                placeholder={props.placeholder}
                required={props.required}
                readOnly={props.readOnly}
                disabled={props.disabled}
                inputMode={props.inputMode}
                hidden={props.hidden}
                onChange={props.onChange}
            />
        </div>
    </>;
}

