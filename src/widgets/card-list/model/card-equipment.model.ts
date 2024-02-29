import { useQuery } from "react-query";
import { getAllEquipments } from "@src/widgets/card-list/model/api/equipment.ts";
import { Equipment } from "@src/entities/equipment/Equipments.ts";

type FilterEquipments = {
  debouncedValue: string;
  skip: number;
  take: number;
};

export type ResponseGetEquipments = {
  msg: string;
  data: Equipment[];
  count: {
    _count: number;
  };
};

export const useGetEquipments = (filter: FilterEquipments) => {
  const { debouncedValue, take, skip } = filter;
  return useQuery<ResponseGetEquipments, Error>({
    queryKey: ["equipments", debouncedValue, skip, take],
    queryFn: () => getAllEquipments(debouncedValue, skip, take),
  });
};
