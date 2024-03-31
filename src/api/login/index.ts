import axiosInstance from "@/lib/axios";


export const apiLogin = async (formData: FormData): Promise<ResponseData> => {
    const response = await axiosInstance.post('/login', formData)

    return response.data
}