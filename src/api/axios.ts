import axios from "axios";
import storage from "@/utils/storage";

const api = axios.create({
    baseURL: `${process.env.API_URL}/api/`
})


api.interceptors.request.use((config) => {
    const token = storage.getToken()
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
}, (error) => Promise.reject(error))


api.interceptors.response.use(null, (error) => {
    if (error.response){

    }
})

export default api