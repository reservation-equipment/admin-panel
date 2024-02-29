import { useQuery } from "react-query";
import { getAllAreas } from "@src/shared/api/Areas.ts";
import { Area } from "../../entities/area/Area.ts";

export const useGetAreas = () => {
  return useQuery<Area[], Error>({
    queryKey: ["areas"],
    queryFn: getAllAreas,
  });
};
