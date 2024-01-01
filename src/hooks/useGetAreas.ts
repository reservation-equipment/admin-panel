import {useQuery} from "react-query";
import {getAllAreas} from "../api/Areas.ts";
import {Area} from "../shared/types/Area.ts";

export const useGetAreas = () => {
    return useQuery<Area[], Error>({
        queryKey: ["areas"],
        queryFn: getAllAreas
    })
}