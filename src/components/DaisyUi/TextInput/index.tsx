import React, {ChangeEvent} from "react";

interface Props {
    id: string;
    label?: string;
    type: string;
    min?: number;
    max?: number;
    placeholder?: string;
    defaultValue?: string | number | readonly string[] | undefined;
    required?: boolean;
    onChange?: (e: any) => void;
}
export default function DaisyUiComponent(props: Props) {
    return <>
        <div>
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
                onChange={props.onChange}
            />
        </div>
    </>;
}

