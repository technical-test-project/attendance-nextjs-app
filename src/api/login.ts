import api from "@/api/axios";
import LoginDTO from "@/utils/dto/loginDTO";


const apiLogin = async (loginDTO: LoginDTO) => {
    const response = await api.post('/login', {
        ...loginDTO
    })

    return response.data.data
}