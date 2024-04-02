import { useQuery } from "react-query";
import { getAllInstitutes, InstitutesModel } from "@src/entities/department";

export const useInstitutes = () => {
  return useQuery<InstitutesModel[], Error>("institutes", getAllInstitutes);
};
