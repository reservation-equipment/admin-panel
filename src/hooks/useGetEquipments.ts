import {useQuery} from "react-query";
import {baseUrl} from "../config/api.ts";
import $api from "../api/axios.ts";
import {Equipment} from "../shared/types/Equipments.ts";

type FilterEquipments = {
    debouncedValue: string
    take: number
    page: number
}

export type ResponseGetEquipments = {
    msg: string
    data: Equipment[]
    count: {
        _count: number
    }
}

export const useGetEquipments = (filter: FilterEquipments) => {
    const {debouncedValue, take, page} = filter
    return useQuery<ResponseGetEquipments, Error>({
        queryKey: ["equipments",
            debouncedValue,
            page,
            take],
        queryFn: () => $api.get(`${baseUrl}/equipments`,
            {
                params: {
                    name: debouncedValue,
                    skip: (page - 1) * take,
                    take
                }
            }).then(res => res.data)
    })
}