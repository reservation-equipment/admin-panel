import {baseUrl} from "../api.ts";


export const getAllInstitutes = () => fetch(`${baseUrl}/departments`).then(response => response.json())

export const getAllInfo = () => fetch(`${baseUrl}/department/info`).then(response => response.json())