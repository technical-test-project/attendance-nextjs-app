import React from "react";
import {DaisyUiButton, DaisyUiTextInput} from "@/components/DaisyUi";

interface DateRangeDefaultValue {
    startDate?: string;
    endDate?: string;
}

interface Props {
    buttonText?: string;
    className?: string;
    dateRangeDefaultValue?: DateRangeDefaultValue | undefined;
    onStartDateChange?: (e?: any) => void;
    onEndDateChange?: (e?: any) => void;
    onClick?: (e?: any) => void;
}

export default function Component (props: Props){

    const dateRangeDefaultValue = props.dateRangeDefaultValue

    return <>
        <div className="join flex justify-start gap-2">
            <DaisyUiTextInput
                id={"startDate"}
                type={"date"}
                defaultValue={dateRangeDefaultValue?.startDate}
                onChange={props.onStartDateChange}/>

            <DaisyUiTextInput
                id={"endDate"}
                type={"date"}
                defaultValue={dateRangeDefaultValue?.endDate}
                onChange={props.onEndDateChange}/>

            <DaisyUiButton text={props.buttonText ?? "Filter"} onClick={props.onClick}/>
        </div>
    </>
}
