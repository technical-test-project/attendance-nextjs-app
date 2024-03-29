import {DaisyUiTable} from "@/components/DaisyUi";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {apiAttendances} from "@/api/attendances";
import Helpers from "@/utils/helpers";

const AttendancePage = () => {
    const router = useRouter()
    const [data, setData] = useState<AttendanceGroupByDate[]>();
    const [columns, setColumns] = useState<TableColumn[]>()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        try {
            const response = await apiAttendances()
            const mappingData = Helpers.attendanceGroupByDate(response.data)

            setData(mappingData)
            setColumns([
                {field: 'id', headerName: 'No'},
                {field: 'userName', headerName: 'Nama Karyawan'},
                {field: 'clockInAt', headerName: 'Jam Masuk'},
                {field: 'clockOutAt', headerName: 'Jam Pulang'},
            ])
        } catch (e: any) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }


    return (<>
        <div className="card card-compact bg-base-300 shadow-xl mb-6 p-4">
            <div className="card-body">
                <h2 className="card-title">Welcome!</h2>
                <p className="my-4 text-md">Tolong absenkan diri Anda di sini untuk mencatat kehadiran datang dan pulang
                    Anda.
                    Absen datang untuk memulai hari dengan baik dan absen pulang untuk menandai selesainya aktivitas
                    hari ini.
                    Terima kasih atas kerjasamanya!
                </p>

            </div>
        </div>

        <div className="card card-compact bg-base-300 shadow-xl mb-6 p-4">
            <div className="card-body">
                <h2 className="card-title">Daftar Kehadiran Anda</h2>


                { !loading
                    ? (<DaisyUiTable data={data} columns={columns}/>)
                    : ( <span className="loading loading-spinner loading-lg mx-auto py-20"></span>)
                }

            </div>
        </div>

    </>);
};

export default AttendancePage;