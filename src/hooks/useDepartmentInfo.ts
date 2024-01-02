import {useQuery} from "react-query";
import {fetchAllInfoDepartment} from "../api/Departments.ts";
import {DepartmentInfo, fetchAllInfoDepartmentT} from "../shared/types/Departments.ts";

export const useDepartmentInfo = (filter: fetchAllInfoDepartmentT) => {
    return useQuery<DepartmentInfo[], Error>({
        queryKey: ["infoTables"],
        queryFn: () => fetchAllInfoDepartment(filter)
    })
}