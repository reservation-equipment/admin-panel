import {
  MutationKey,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { baseUrl } from "../../app/config/api.ts";
import $api from "@src/shared/api/axios.ts";
import { Equipment } from "@src/entities/equipment/Equipments.ts";
import { AxiosError } from "axios";

type UseCreateEquipmentMutationResult = UseMutationResult<
  Equipment[],
  AxiosError,
  any,
  MutationKey
>;

export const useCreateEquipment = (): UseCreateEquipmentMutationResult => {
  const queryClient = useQueryClient();

  return useMutation(
    (equipment) => {
      return $api
        .post(`${baseUrl}/equipment`, JSON.stringify(equipment), {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["equipments"]),
    }
  );
};
