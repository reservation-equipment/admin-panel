import {useMutation, useQueryClient} from "react-query";
import {baseUrl} from "../config/api.ts";
import $api from "../api/axios.ts";

export const useCreateEquipment = () => {
    const queryClient = useQueryClient();

    return useMutation(equipment => {
        return $api.post(`${baseUrl}/equipment`, JSON.stringify(equipment), {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.data)
    }, {
        onSuccess: () => queryClient.invalidateQueries(['equipments'])
    })
}