import { baseUrl } from "../../app/config/api.ts";
import $api from "./axios.ts";

export const getAllAreas = () =>
  $api.get(`${baseUrl}/areas`).then((response) => response?.data?.data);