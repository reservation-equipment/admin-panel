import {useQuery} from "react-query";
import DepartmentService from "../services/DepartmentService.ts";
import {InstitutesModel} from "../shared/types/Departments.ts";

export const useInstitutes = () => {
    return useQuery<InstitutesModel[], Error>(
        "institutes",
        DepartmentService.getAllInstitutes
    )
}