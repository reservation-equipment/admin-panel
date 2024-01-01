import {useQuery} from "react-query";
import {getAllInfo} from "../api/Departments.ts";
import {DepartmentInfo} from "../shared/types/Departments.ts";

export const useDepartmentInfo = () => {
    return useQuery<DepartmentInfo[], Error>({
        queryKey: ["infoTables"],
        queryFn: getAllInfo
    })
}