import React from "react";
import {Table} from "@tanstack/table-core";
import {DaisyUiSelect, DaisyUiTextInput} from "@/components/DaisyUi";

interface Props {
    className?: string
    table: Table<any>
    receivedValueFromChild: any
}


export default function DaisyUiTopPagination(props: Props) {

    return <>
        <div className="flex flex-wrap mb-4 mx-1">
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <div>Show</div>
                    <DaisyUiSelect
                        className="bordered border-white select-sm"
                        values={[10, 20, 30, 50, 100]}
                        onChange={(e: any) => {
                            props.receivedValueFromChild({perPage: e.target.value})
                        }}/>
                    <div>Data</div>
                </div>
            </div>


            <div className="flex-2 gap-1.5">
                <DaisyUiTextInput
                    id={"a"}
                    type={"text"}
                    placeholder={"Search"}
                    onChange={(e: any) => {
                        props.receivedValueFromChild({search: e.target.value})
                    }}/>
            </div>
        </div>

    </>;
}
