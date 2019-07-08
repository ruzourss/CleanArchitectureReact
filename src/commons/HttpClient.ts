import axios, {AxiosInstance} from 'axios'

export const httpClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 50000,
})

