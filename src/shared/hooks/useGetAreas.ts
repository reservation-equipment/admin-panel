import { useQuery } from "react-query";
import { Area, getAllAreas } from "@src/entities/area";

export const useGetAreas = () => {
  return useQuery<Area[], Error>({
    queryKey: ["areas"],
    queryFn: getAllAreas,
  });
};
