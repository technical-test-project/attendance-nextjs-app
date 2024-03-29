import {createColumnHelper, getCoreRowModel, getPaginationRowModel} from "@tanstack/table-core";
import {flexRender, useReactTable} from "@tanstack/react-table";
import {DaisyUiPagination} from "@/components/DaisyUi";


interface Props {
    data?: any[];
    columns?: TableColumn[]
}

const Component = (props: Props) => {

    const data = props.data
    const columnHelper = createColumnHelper()

    const columns = props.columns?.map((column, index) => {
        return columnHelper.accessor(column.field, {
            cell: info => (
                index == 0 ? (
                    <span>{info.row.index + 1}</span>
                ) : (
                    <span>{info.getValue() ?? '-'}</span>
                )
            ),
            header: column.headerName
        })
    })


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })


    return (
        <div className="overflow-x-auto pt-8">
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

            <DaisyUiPagination table={table}/>
        </div>
    )
}

export default Component
