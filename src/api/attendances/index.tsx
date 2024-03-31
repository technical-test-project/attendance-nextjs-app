import axiosInstance from "@/lib/axios";

export const apiAttendances = async (params: QueryParamsOfPagination) : Promise<ResponseData> => {
    const response = await axiosInstance.get('/attendances', {
        params
    })

    return response.data
}

export const apiTodayAttendance = async (): Promise<ResponseData> => {
    const response = await axiosInstance.get('/attendances/today')

    return response.data
}


export const apiAttendanceClockIn = async () => {
    const response = await axiosInstance.post('/attendances/clock-in')

    return response.data
}

export const apiAttendanceClockOut = async () => {
    const response = await axiosInstance.post('/attendances/clock-out')

    return response.data
}

