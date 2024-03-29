import api from "@/api/axios";


export const apiAttendances = async () : Promise<ResponseData> => {
    const response = await api.get('/attendances')

    return response.data
}
