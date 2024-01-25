import axios from 'axios'

export const axiosService = axios.create({
    withCredentialsL: true
})