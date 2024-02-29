import { baseUrl } from "@src/app/config/api.ts";
import $api from "@src/shared/api/axios.ts";

export const getAllEquipments = (
  debouncedValue: string,
  skip: number,
  take: number
) =>
  $api
    .get(`${baseUrl}/equipments`, {
      params: {
        name: debouncedValue,
        skip,
        take,
      },
    })
    .then((res) => res.data);