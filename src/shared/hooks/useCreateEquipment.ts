import {
  MutationKey,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { baseUrl } from "../../app/config/api.ts";
import $api from "@src/shared/api/axios.ts";
import { AxiosError } from "axios";
import { Equipment } from "@src/entities/equipment";

type UseCreateEquipmentMutationResult = UseMutationResult<
  Equipment[],
  AxiosError,
  Equipment,
  MutationKey
>;

export const useCreateEquipment = (): UseCreateEquipmentMutationResult => {
  const queryClient = useQueryClient();

  return useMutation(
    (equipment: Equipment) => {
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
