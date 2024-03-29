import React from "react";
import {Table} from "@tanstack/table-core";
import {DaisyUiTextInput} from "@/components/DaisyUi";

interface Props {
    table: Table<any>
}


export default function Component(props: Props) {

    let page = props.table.getState().pagination.pageIndex + 1
    let pageCount = props.table.getPageCount()

    const onChangePage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const page = e.target.value ? Number(e.target.value) - 1 : 0
        props.table.setPageIndex(page)
    }

    return <>
        <div className="flex justify-end pt-7 pe-2">
            <div className="flex items-center gap-1 px-5">
                Go to page :
                <DaisyUiTextInput
                    id={"page"}
                    type={"number"}
                    min={page}
                    max={pageCount}
                    defaultValue={page.toString()}
                    onChange={onChangePage}/>
            </div>
            <div className="join flex">
                <button className="join-item btn border border-white text-xl rounded-l-xl"
                        disabled={!props.table.getCanPreviousPage()}
                        onClick={() => props.table.previousPage()}>
                    «
                </button>

                <button className="join-item btn border border-white text-xs cursor-pointer pointer-events-none">
                    Page {page} of {pageCount}
                </button>

                <button className="join-item btn border border-white text-xl rounded rounded-r-xl"
                        disabled={!props.table.getCanNextPage()}
                        onClick={() => props.table.nextPage()}>
                    »
                </button>
            </div>

        </div>

    </>;
}
