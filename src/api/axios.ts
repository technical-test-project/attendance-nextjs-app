import axios from "axios";
import storage from "@/utils/storage";

const api = axios.create({
    // baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
    baseURL: `http://localhost:3333/api/`,
})

api.interceptors.request.use((config) => {
    const storageToken = storage.getToken()
    console.log(`storageToken : ${storageToken}`)
    const token = 'oat_MQ.SUR0ZG85b1RmZGJraUR0WVVkcjV2TUlnaWRNNW93d1BsMzdtdXhLRTMyNTQxNDM0NTg'

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
}, (error) => Promise.reject(error))


api.interceptors.response.use(null, (error) => {
    if (error.response) {
        const { status, data } = error.response;
        switch (status) {
            case 401:
                return Promise.reject(new ApiResponseException('Unauthenticated', data.message));
            case 403:
                return Promise.reject(new ApiResponseException('Unauthorized', data.message));
            case 404:
                return Promise.reject(new ApiResponseException('NotFound', data.message));
            case 422:
                return Promise.reject(new ApiResponseException('Validation', data.message, data.errors));
            case 500:
                return Promise.reject(new ApiResponseException('Internal', data.message, data.errors));
            default:
                return Promise.reject(error);
        }
    } else {
        return Promise.reject(error);
    }
})



export class ApiResponseException extends Error {
    code: string;
    errors?: any;

    constructor(code: string, message: string, errors?: any) {
        super(message);
        this.code = code;
        this.errors = errors;
    }

    isInternalError = (): boolean => this.code === 'Internal';

    isUnauthenticatedError = (): boolean => this.code === 'Unauthenticated';

    isUnauthorizedError = (): boolean => this.code === 'Unauthorized';

    isNotFoundError = (): boolean => this.code === 'NotFound';

    isValidationError = (): boolean => this.code === 'Validation';
}


export default api