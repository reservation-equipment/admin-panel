import {baseUrl} from "../api.ts";

export const getAllAreas = () => fetch(`${baseUrl}/areas`,).then(response => response.json())