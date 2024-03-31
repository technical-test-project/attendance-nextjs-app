import axiosInstance, {BASE_URL} from "@/lib/axios";
import StorageManager from "@/utils/storageManager";


export const apiImageUrl = (filename: string | null | undefined, subfolder: string | null): string | null => {
    let resultImageUrl = `${BASE_URL}/images/${filename}`
    if (subfolder){
        resultImageUrl += `/?subfolder=${subfolder}`
    }
    return filename ? resultImageUrl : null
}

export const apiProfile = async (): Promise<ResponseData> => {
    const response = await axiosInstance.get('/profile')

    const responseData = response.data
    if (responseData){
        const user = responseData.data as User
        StorageManager.refreshUser(user)
    }

    return responseData
}

export const apiUpdateUserProfile = async (formData: FormData): Promise<ResponseData> => {
    const response = await axiosInstance.post(`/profile/update`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}


export const apiUsers = async (): Promise<ResponseData> => {
    const response = await axiosInstance.get('/users')
    return response.data
}

export const apiUserDetail = async (userId: number): Promise<ResponseData> => {
    const response = await axiosInstance.get(`/users/${userId}`)
    return response.data
}

export const apiStoreUser = async (formData: FormData): Promise<ResponseData> =>  {
  const response = await axiosInstance.post('/users', formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  })
    return response.data
}

export const apiUpdateUser = async (userId: number, formData: FormData): Promise<ResponseData> => {
    const response = await axiosInstance.patch(`/users/${userId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
}

export const apiDeleteUser = async (userId: number): Promise<ResponseData> => {
    const response = await axiosInstance.delete(`/users/${userId}`)

    return response.data
}

