import { useQuery } from "react-query";
import { InstitutesModel } from "../../entities/department/department.ts";
import { getAllInstitutes } from "@src/shared/api/Departments.ts";

export const useInstitutes = () => {
  return useQuery<InstitutesModel[], Error>("institutes", getAllInstitutes);
};
