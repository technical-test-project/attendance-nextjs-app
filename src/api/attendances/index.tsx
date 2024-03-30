import api from "@/lib/axios";

export const apiAttendances = async (params: AttendanceQSInterface) : Promise<ResponseData> => {
    const response = await api.get('/attendances', {
        params
    })

    return response.data
}

export const apiTodayAttendance = async (): Promise<ResponseData> => {
    const response = await api.get('/attendances/today')

    return response.data
}


export const apiAttendanceClockIn = async () => {
    const response = await api.post('/attendances/clock-in')

    return response.data
}

export const apiAttendanceClockOut = async () => {
    const response = await api.post('/attendances/clock-out')

    return response.data
}

