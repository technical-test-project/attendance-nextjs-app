import {DaisyUiButton, DaisyUiDateRange, DaisyUiModal, DaisyUiTable} from "@/components/DaisyUi";
import React, {useEffect, useState} from "react";
import {apiAttendanceClockIn, apiAttendanceClockOut, apiAttendances, apiTodayAttendance} from "@/api/attendances";
import Helpers from "@/utils/helpers";
import {debounce} from "next/dist/server/utils";


export default function AttendancePage() {
    const [data, setData] = useState<AttendanceGroupByDate[]>();
    const [columns, setColumns] = useState<TableColumn[]>()
    const [todayAttendance, setTodayAttendance] = useState<TodayAttendance>()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [startDate, setStartDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)

    const [isOpenModalClockIn, setIsOpenModalClockIn] = useState(false)
    const [isOpenModalClockOut, setIsOpenModalClockOut] = useState(false)

    const fetchData = () => {
        fetchTodayAttendance()
        fetchAttendances()

    }

    useEffect(() => {
        fetchData()
    }, [])


    /**
     * Fetch Attendance
     * - Filter by query params { AttendanceQSInterface }
     * @param queryParams
     */
    const globalColumns = [
        {field: 'id', headerName: 'No'},
        {field: 'userName', headerName: 'Nama Karyawan'},
        {field: 'clockInAt', headerName: 'Jam Masuk'},
        {field: 'clockOutAt', headerName: 'Jam Pulang'}
    ]

    const fetchAttendances = async (queryParams: AttendanceQSInterface) => {
        setLoading(true);
        try {
            const response = await apiAttendances(queryParams)
            const mappingData = Helpers.attendanceGroupByDate(response.data)

            setData(mappingData)
            setColumns(globalColumns)
        } catch (e: any) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Fetch Today Attendance
     * - Check Is ClockIn & Is ClockOut
     */
    const fetchTodayAttendance = async () => {
        try {
            const response = await apiTodayAttendance()

            setTodayAttendance(response.data)
        } catch (e: any) {
            setError(e);
        } finally {
            // setLoading(false);
        }
    }

    /**
     * Store Attendance Clock In
     */
    const storeAttendanceClockIn = async () => {
        try {
            const response = await apiAttendanceClockIn()
            if (response.data !== null) {
                refreshPage()
            }
        } catch (e: any) {
            setError(e);
        }
    }


    /**
     * Store Attendance Clock In
     */
    const storeAttendanceClockOut = async () => {

        try {
            const response = await apiAttendanceClockOut()
            if (response.data !== null) {
                refreshPage()
            }
        } catch (e: any) {
            setError(e);
        }
    }


    const refreshPage = () => {
        const timeout = setTimeout(() => {
            setIsOpenModalClockIn(false)
            setIsOpenModalClockOut(false)
            fetchData()
        }, 1000)

        return () => clearTimeout(timeout)
    }


    return <>
        <div className="card card-compact bg-base-300 shadow-xl mb-6 p-4">
            <div className="card-body">
                <h2 className="card-title">Welcome!</h2>
                <p className="my-4 text-md">Tolong absenkan diri Anda di sini untuk mencatat kehadiran datang dan pulang
                    Anda.
                    Absen datang untuk memulai hari dengan baik dan absen pulang untuk menandai selesainya aktivitas
                    hari ini.
                    Terima kasih atas kerjasamanya!
                </p>

                <div className="flex join mx-auto gap-1.5">

                    <DaisyUiButton text={"Absen Datang"}
                                   className={"disabled:border-white"}
                                   disabled={todayAttendance?.isClockIn}
                                   onClick={() => {
                                       setIsOpenModalClockIn(true)
                                   }}/>

                    <DaisyUiModal isOpen={isOpenModalClockIn}
                                  title={'Absen Datang'}
                                  message={'Apakah anda yakin ingin melakukan absensi datang?'}
                                  onConfirm={() => {
                                      storeAttendanceClockIn()
                                  }}
                                  onClose={() => {
                                      setIsOpenModalClockIn(false)
                                  }}
                    />


                    <DaisyUiButton text={"Absen Pulang"}
                                   className={"disabled:border-white"}
                                   disabled={!todayAttendance?.isClockIn}
                                   onClick={() => {
                                       setIsOpenModalClockOut(true)
                                   }}/>

                    <DaisyUiModal isOpen={isOpenModalClockOut}
                                  title={'Absen Pulang'}
                                  message={'Apakah anda yakin ingin melakukan absensi pulang?'}
                                  onConfirm={() => {
                                      storeAttendanceClockOut()
                                  }}
                                  onClose={() => {
                                      setIsOpenModalClockOut(false)
                                  }}
                    />
                </div>
            </div>
        </div>

        <div className="card card-compact bg-base-300 shadow-xl mb-6 p-4">
            <div className="card-body">
                <h2 className="card-title">Daftar Kehadiran Anda</h2>

                <p className="my-4 text-md">
                    Daftar Kehadiran secara default ditampilkan pada
                    bulan {Helpers.convertDate(new Date().toISOString(), 'MMMM YYYY')}
                </p>

                <DaisyUiDateRange
                    buttonText={"Tampilkan"}
                    dateRangeDefaultValue={{startDate: startDate, endDate: endDate}}
                    onStartDateChange={(e: any) => setStartDate(e.target.value)}
                    onEndDateChange={(e: any) => setEndDate(e.target.value)}
                    onSubmit={() => fetchAttendances({startDate, endDate})}
                />


                {!loading ? (<DaisyUiTable data={data} columns={columns}/>) : (
                    <span className="loading loading-spinner loading-lg mx-auto py-20"></span>)}

            </div>
        </div>
    </>
};