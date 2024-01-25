import { axiosService } from "./axios"
import { URL } from "../config"

export const prueba_request = async () => {
    const response = await axiosService.get(`${URL}/emotions/get_all`)
    return response
}
