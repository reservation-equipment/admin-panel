import { baseUrl } from "../../app/config/api.ts";
import $api from "./axios.ts";
import { fetchAllInfoDepartmentT } from "../../entities/department/department.ts";

export const fetchAllInfoDepartment = (filter: fetchAllInfoDepartmentT) =>
  $api
    .get(`${baseUrl}/department/info`, {
      params: {
        ...filter,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data.data;
    });

export const getAllInstitutes = async () =>
  $api.get("/departments").then((res) => res.data.data);
