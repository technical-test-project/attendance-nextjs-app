import axiosInstance from "@/lib/axios";
import StorageManager from "@/utils/storageManager";


export const apiProfile = async (): Promise<ResponseData> => {
    const response = await axiosInstance.get('/profile')

    const responseData = response.data
    if (responseData){
        const user = responseData.data as User
        StorageManager.refreshUser(user)
    }

    return responseData
}

export const apiUpdateUser = async (userId: number, formData: FormData): Promise<ResponseData> => {
    const response = await axiosInstance.patch(`/users/${userId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}

export const apiUpdateUserProfile = async (userId: number, formData: FormData): Promise<ResponseData> => {
    const response = await axiosInstance.patch(`/profile/${userId}/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}