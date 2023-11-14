import {baseUrl} from "../../config/api.ts";

export const CreateEquipmentQuery = async (data: any) => {
    const res = await fetch(`${baseUrl}/equipment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return res
}