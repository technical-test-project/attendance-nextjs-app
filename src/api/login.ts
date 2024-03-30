import axiosInstance from "@/lib/axios";


interface LoginData {
    email?: string | undefined;
    password?: string | undefined;
}

export const apiLogin = async (data: LoginData): Promise<ResponseData> => {
    const response = await axiosInstance.post('/login', data)

    return response.data
}