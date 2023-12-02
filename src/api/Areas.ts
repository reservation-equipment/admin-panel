import {baseUrl} from "../config/api.ts";

export const getAllAreas = () => fetch(`${baseUrl}/areas`).then(response => response.json())