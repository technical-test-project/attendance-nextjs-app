import api from "@/api/axios";

interface Params {
    page?: number;
    perPage?: number;
    startDate?: string;
    endDate?: string;
}

export const apiAttendances = async (params: Params) : Promise<ResponseData> => {
    const response = await api.get('/attendances', {
        params
    })

    return response.data
}
