import {baseUrl} from "../config/api.ts";
import $api from "./axios.ts";
import {fetchAllInfoDepartmentT} from "../shared/types/Departments.ts";

export const fetchAllInfoDepartment = (filter: fetchAllInfoDepartmentT) => $api.get(`${baseUrl}/department/info`, {
    params: {
        ...filter
    }
}).then(res => {
    console.log(res)
    return res.data.data
})