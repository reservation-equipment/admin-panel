import {baseUrl} from "../config/api.ts";

export const getAllInfo = () => fetch(`${baseUrl}/department/info`).then(response => response.json())