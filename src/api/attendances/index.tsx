import api from "@/api/axios";

export const apiAttendances = async (params: AttendanceQSInterface) : Promise<ResponseData> => {
    const response = await api.get('/attendances', {
        params
    })

    return response.data
}
