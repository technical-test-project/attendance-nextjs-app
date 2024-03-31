import React, {useEffect, useState} from "react";
import {Table} from "@tanstack/table-core";
import {DaisyUiSelect, DaisyUiTextInput} from "@/components/DaisyUi";

interface Props {
    className?: string;
    table: Table<any>;
    globalFilterValue: string;
    onChange: EventHandlerInterface;
}

let debounce: number = 500

export default function DaisyUiTopPagination(props: Props) {

    const [filterValue, setFilterValue] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.onChange(filterValue)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [filterValue, props])

    return <>
        <div className="flex flex-wrap-reverse mb-4 mx-1">
            <div className="flex-1 my-2">
                <div className="flex items-center gap-2">
                    <div>Show</div>
                    <DaisyUiSelect
                        id={"paginateSize"}
                        className="bordered border-white select-sm"
                        defaultValue={props.table.getState().pagination.pageSize.toString()}
                        items={[5, 10, 20, 30, 50, 100]}
                        onChange={(e: any) => {
                            props.table.setPageSize(Number(e.target.value))
                        }}/>
                    <div>Data</div>
                </div>
            </div>


            <div className="gap-1.5 mb-2">
                <DaisyUiTextInput
                    id={"a"}
                    type={"text"}
                    placeholder={"Search"}
                    defaultValue={filterValue}
                    onChange={(e: any) => {
                       setFilterValue(e.target.value)
                    }}/>
            </div>
        </div>

    </>;
}
