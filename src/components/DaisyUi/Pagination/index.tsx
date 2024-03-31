import React, {useState} from "react";
import {Table} from "@tanstack/table-core";
import DaisyUiTopPagination from "@/components/DaisyUi/Pagination/top"
import DaisyUiBottomPagination from "@/components/DaisyUi/Pagination/bottom"

interface Props {
    table: Table<any>;
    children: React.ReactNode;
    globalFilterValue?: string;
    onChange: EventHandlerInterface;
}


export default function DaisyUiComponent(props: Props) {

    const [globalFilterValue, setGlobalFilterValue] = useState('')

    const handleSetGlobalFilterValue = (value: string) => {
        setGlobalFilterValue(value)
        props.onChange(value)
    }

    return <>
        <div className="mx-2">
            <DaisyUiTopPagination table={props.table} globalFilterValue={globalFilterValue} onChange={handleSetGlobalFilterValue}/>
            {props.children}
            <DaisyUiBottomPagination table={props.table}/>
        </div>

    </>;
}
