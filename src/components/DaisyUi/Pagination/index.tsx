import React  from "react";
import {Table} from "@tanstack/table-core";
import DaisyUiTopPagination from "@/components/DaisyUi/Pagination/top"
import DaisyUiBottomPagination from "@/components/DaisyUi/Pagination/bottom"

interface Props {
    table: Table<any>;
    children: React.ReactNode;
    receivedValueFromChild: any
}


export default function DaisyUiComponent(props: Props) {

    return <>
        <div className="mx-2">
            <DaisyUiTopPagination table={props.table} receivedValueFromChild={props.receivedValueFromChild}/>
            {props.children}
            <DaisyUiBottomPagination table={props.table}/>
        </div>

    </>;
}
