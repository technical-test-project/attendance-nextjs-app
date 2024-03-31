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
    onStartDateChange?: EventHandlerInterface;
    onEndDateChange?: EventHandlerInterface;
    onSubmit?: EventHandlerInterface;
}

export default function DaisyUiComponent(props: Props) {

    const dateRangeDefaultValue = props.dateRangeDefaultValue

    return <>
        <div className="flex flex-wrap items-center gap-3">
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

            <DaisyUiButton className={"max-h-10 min-h-8"} text={props.buttonText ?? "Filter"} onClick={props.onSubmit}/>
        </div>
    </>
}
