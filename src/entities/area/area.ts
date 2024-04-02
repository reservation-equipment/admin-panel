import $api from "@src/shared/api/axios.ts";
import { baseUrl } from "@src/app/config/api.ts";

export interface Area {
  id: number;
  institutes_id: number;
  name: string;
  appointment: string;
  description: string;
  institute: string;
  square: number;
}

export const getAllAreas = () =>
  $api.get(`${baseUrl}/areas`).then((response) => response?.data?.data);
