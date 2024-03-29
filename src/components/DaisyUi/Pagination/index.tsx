import React, {ChangeEvent, useEffect, useState} from "react";
import {Table} from "@tanstack/table-core";
import {DaisyUiTextInput} from "@/components/DaisyUi";
import table from "@/components/DaisyUi/Table";

interface Props {
    table: Table<any>
}


export default function Component(props: Props) {

    let page = props.table.getState().pagination.pageIndex + 1
    let pageCount = props.table.getPageCount()

    const onChangePage = (e: ChangeEvent<HTMLInputElement>) => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0
        props.table.setPageIndex(page)
    }

    return <>
        <div className="join flex justify-end pt-6">
            <button className="join-item btn border border-white text-xl"
                    disabled={!props.table.getCanPreviousPage()}
                    onClick={()=> props.table.previousPage()}>
                «
            </button>

            <button className="join-item border btn border-white text-xs cursor-pointer pointer-events-none">
                Page {page} of {pageCount}
            </button>

            <button className="join-item btn border border-white text-xl"
                    disabled={!props.table.getCanNextPage()}
                    onClick={() => props.table.nextPage()}>
                »
            </button>

            <div className="flex items-center gap-1">
                | Go to page :
                <DaisyUiTextInput
                    id={"page"}
                    type={"number"}
                    min={page}
                    max={pageCount}
                    defaultValue={page.toString()}
                    onChange={onChangePage}/>
            </div>
        </div>
    </>;
}
