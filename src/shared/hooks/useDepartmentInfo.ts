import { useQuery } from "react-query";
import { fetchAllInfoDepartment } from "@src/shared/api/Departments.ts";
import {
  DepartmentInfo,
  fetchAllInfoDepartmentT,
} from "../../entities/department/department.ts";

export const useDepartmentInfo = (filter: fetchAllInfoDepartmentT) => {
  return useQuery<DepartmentInfo[], Error>({
    queryKey: ["infoTables"],
    queryFn: () => fetchAllInfoDepartment(filter),
  });
};
