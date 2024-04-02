import { baseUrl } from "../../app/config/api.ts";
import $api from "@src/shared/api/axios.ts";

export interface InstitutesModel {
  id: number;
  name: string;
}

export interface DepartmentInfo {
  id: number;
  equipment: string;
  area: string;
  institute: string;
}

export type fetchAllInfoDepartmentT = {
  skip: number;
  take: number;
};

export const fetchAllInfoDepartment = (filter: fetchAllInfoDepartmentT) =>
  $api
    .get(`${baseUrl}/department/info`, {
      params: {
        ...filter,
      },
    })
    .then((res) => {
      return res.data.data;
    });

export const getAllInstitutes = async () =>
  $api.get("/departments").then((res) => res.data.data);
