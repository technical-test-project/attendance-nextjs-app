import React from "react";
import {DaisyUiButton, DaisyUiTextInput} from "@/components/DaisyUi";

interface Props {
    buttonText?: string;
    className?: string;
    onStartDateChange?: (e?: any) => void;
    onEndDateChange?: (e?: any) => void;
    onClick?: (e?: any) => void;
}

export default function Component (props: Props){
    return <>
        <div className="join flex justify-start gap-2">
            <DaisyUiTextInput id={"startDate"} type={"date"} onChange={props.onStartDateChange}/>
            <DaisyUiTextInput id={"endDate"} type={"date"} onChange={props.onEndDateChange}/>
            <DaisyUiButton text={props.buttonText ?? "Filter"} onClick={props.onClick}/>
        </div>
    </>
}
