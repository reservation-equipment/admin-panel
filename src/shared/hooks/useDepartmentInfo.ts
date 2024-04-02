import { useQuery } from "react-query";
import {
  DepartmentInfo,
  fetchAllInfoDepartment,
  fetchAllInfoDepartmentT,
} from "@src/entities/department";

export const useDepartmentInfo = (filter: fetchAllInfoDepartmentT) => {
  return useQuery<DepartmentInfo[], Error>({
    queryKey: ["infoTables"],
    queryFn: () => fetchAllInfoDepartment(filter),
  });
};
