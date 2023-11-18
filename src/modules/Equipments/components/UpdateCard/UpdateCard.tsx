import {Button, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {baseUrl} from "../../../../config/api.ts";
import {useEffect, useMemo} from "react";

type UpdateCardProps = {
    id: number | null
    close: () => void
}

const UpdateCard = ({id, close}: UpdateCardProps) => {
    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: ["areas"],
        queryFn: () => fetch(`${baseUrl}/areas`,).then(response => response.json())
    })

    const {data: oldData, isLoading: oldIsLoading} = useQuery({
        queryKey: ["equipmentsUpdate"],
        queryFn: () => fetch(`${baseUrl}/equipment/${id}`).then(res => res.json()),
    })
    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: oldData
    });

    useEffect(() => {
        reset(oldData);
    }, [oldData]);

    const mutation = useMutation(equipment => {
        return fetch(`${baseUrl}/equipment`, {
            method: "patch",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(equipment)
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries(['equipments'])
    })

    const handleUpdateEquipment = (data: any) => {
        data.count = Number(data.count)
        mutation.mutate(data)
        close()

    }

    const renderSelectItems = useMemo(() => {
        return  data?.data.map((area: any) => {
            return <MenuItem key={area.id} value={area.id}>{area.name}</MenuItem>
        })
    }, [data]);
    if (isLoading || oldIsLoading) return <p>Loading....</p>
    return (
        <form onSubmit={handleSubmit(handleUpdateEquipment)} className={"w-full flex flex-col gap-6 mt-8"}>
            <TextField type={"text"}
                       label="Название"
                       id={"CreateForm_name"}
                       fullWidth
                       {...register("name")}
            />
            <TextField
                label="Описание"
                multiline={true}
                type={"text"}
                id={"CreateForm_description"}
                {...register("description")}
            />
            <TextField
                className={"w-fit"}
                type={"number"}
                label="Количество"
                id={"CreateForm_count"}
                {...register("count")}
            />
            <InputLabel id="areas_select">Помещение</InputLabel>
            <Select
                defaultValue={oldData?.area_id}
                {...register("area_id")}
                labelId={"areas_select"}
                label={"Помещение"}
                id={"CreateForm_areas"}>
                {renderSelectItems}
            </Select>
            <Button variant={"contained"} className={"w-fit"} type={"submit"}>{"Обновить"}</Button>
        </form>
    );
};

export default UpdateCard;
