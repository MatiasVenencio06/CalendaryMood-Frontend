import { axiosService } from "./axios"
import { URL } from "../config"

export const prueba_request = async () => {
    const response = await axiosService.get(`${URL}/emotions/get_all`)
    return response
}

export const resume_mood = async () => {
    const response = await axiosService.get(`${URL}/mood/get/resume`)
    return response
}

export const add_mood = async (data) => {
    console.log(data)
    await axiosService.post(`${URL}/mood/add`, data)
}

export const get_emotions = async () => {
    const response = axiosService.get(`${URL}/emotions/get_all`)
    return response
}

export const add_emotion = async (data) => {
    await axiosService.post(`${URL}/emotion/add`, data)
}

export const delete_emotion = async (emotion_id) => {
    await axiosService.delete(`${URL}/emotion/delete/${emotion_id}`)
}