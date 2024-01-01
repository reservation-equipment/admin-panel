import {baseUrl} from "../config/api.ts";
import $api from "./axios.ts";

export const getAllInfo = () => $api.get(`${baseUrl}/department/info`).then(res => {
    console.log(res)
    return res.data.data
})