import {DaisyUiButton, DaisyUiTable} from "@/components/DaisyUi";
import React, {useEffect, useState} from "react";
import {apiUsers} from "@/api/users";
import {useRouter} from "next/navigation";


export default function UserPage() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any[]>();
    const [columns, setColumns] = useState<TableColumn[]>()


    useEffect(() => {
        fetchUsers()
    },[])

    /**
     * Fetch Users
     * - Filter by query params { QueryParamsOfPagination }
     * @param queryParams
     */
    const globalColumns = [
        {field: 'id', headerName: 'No'},
        {field: 'name', headerName: 'Nama'},
        {field: 'email', headerName: 'Email'},
        {field: 'phone', headerName: 'Nomor Telepon'},
        {field: 'roleName', headerName: 'Role'},
        {field: 'positionName', headerName: 'Jabatan'},
        {field: 'action', headerName: 'Aksi'}
    ]

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await apiUsers()

            const users = response.data as User[]

            const userMaps = users.map((user, index) => ({
                id: user.id,
                name: user.profile.name,
                email: user.email,
                phone: user.profile.phone,
                roleName: user.role.name,
                positionName: user?.position?.name,
                action: <><DaisyUiButton text={"Detail"} onClick={()=> console.log(`index ${index}`)}/></>
            }))

            setData(userMaps)
            setColumns(globalColumns)
            setLoading(false)

        } catch (e: any) {
            console.log(e)
        }
    }


    return <>
        <div className="card card-compact bg-base-300 shadow-xl mb-6 p-4">
            <div className="card-body">
                <h2 className="card-title">Daftar Pengguna</h2>

                <div className={"grid-cols-8 flex mt-4 mb-2"}>
                    <DaisyUiButton text={"+ Tambah"} className={"grid-cols-4"} onClick={() => {
                        router.push('/users/create')
                    }}/>
                </div>

                {!loading ? (<DaisyUiTable data={data} columns={columns} urlDetail={"users"}/>) : (
                    <span className="loading loading-spinner loading-lg mx-auto py-20"></span>)}

            </div>
        </div>
    </>
};