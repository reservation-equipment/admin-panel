import axios from 'axios'
import {baseUrl} from "../config/api.ts";

const $api = axios.create({
    withCredentials: true,
    baseURL: baseUrl
})

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`
    return config
})

export default $api