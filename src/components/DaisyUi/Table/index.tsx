import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    Table
} from "@tanstack/table-core";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {DaisyUiButton, DaisyUiPagination} from "@/components/DaisyUi";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


interface Props {
    data?: any;
    columns?: any;
    urlDetail?: string;
}

export default function DaisyUiComponent(props: Props) {
    const router = useRouter()
    const [globalFilter, setGlobalFilter] = useState('')

    useEffect(() => {
        setGlobalFilter(globalFilter)
    },[globalFilter])

    const data = props.data
    const propsColumns: TableColumn[] = props.columns
    const columnHelper = createColumnHelper()

    const columns: any = propsColumns?.map((column, index) => {
        return columnHelper.accessor(column.field, {
            cell: info => (
                index == 0 ? (
                    <span>{info.row.index + 1}</span>
                ) : (
                    // column.field !== 'action' ? info.getValue() : <><DaisyUiButton text={"Detail"} onClick={()=> console.log(`index`, data[info.row.index])}/></>
                    column.field !== 'action' ? info.getValue() : <>
                        <DaisyUiButton text={"Detail"} onClick={()=> {
                            const id = data[info.row.index].id
                            router.push(`/${props.urlDetail}/${id}`)
                        }}/>
                    </>
                )
            ),
            header: column.headerName,
        })
    })


    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter
        },
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: false,
    })

    /**
     * Handle Set Global Filter Value form child
     * @param value
     */
    const handleSetGlobalFilterValue = (value:string) => {
        setGlobalFilter(value)
    }

    return <>
        <div className="overflow-x-auto pt-8">

            <DaisyUiPagination table={table} globalFilterValue={globalFilter} onChange={handleSetGlobalFilterValue}>
                <table className="table table-md table-pin-cols border-white w-full text-center">
                    <thead className="bg-base-100">
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => (
                                        <th key={header.id} className="capitalize px-3.5 text-sm">
                                            {
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                    </thead>
                    <tbody>
                    {
                        table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <tr key={row.id}>
                                    {
                                        row.getVisibleCells().map((cell) => (
                                            <td key={cell.id}>
                                                {
                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        ) : null
                    }
                    </tbody>
                </table>
            </DaisyUiPagination>
        </div>
    </>
}