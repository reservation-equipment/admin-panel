import {Button, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {baseUrl} from "../../../../config/api.ts";
import {useMemo} from "react";


const CreateCard = () => {
    const queryClient = useQueryClient();

    const {data, isLoading} = useQuery({
        queryKey: ["areas"],
        queryFn: () => fetch(`${baseUrl}/areas`,).then(response => response.json())
    })

    const {
        register,
        handleSubmit,
    } = useForm();


    const mutation = useMutation(equipment => {
        return fetch(`${baseUrl}/equipment`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(equipment)
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries(['equipments'])
    })

    const handleCreateEquipment = (data: any) => {
        data.count = Number(data.count)
        mutation.mutate(data)
    }

    const renderSelectItems = useMemo(() => {
        return  data?.data.map((area: any) => {
            return <MenuItem key={area.id} value={area.id}>{area.name}</MenuItem>
        })
    }, [data]);
    if (isLoading) return <p>Loading....</p>
    return (
        <form onSubmit={handleSubmit(handleCreateEquipment)} className={"w-full flex flex-col gap-6 mt-8"}>
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
                {...register("area_id")}
                labelId={"areas_select"}
                label={"Помещение"}
                id={"CreateForm_areas"}>
                {renderSelectItems}
            </Select>
            <Button variant={"contained"} className={"w-fit"} type={"submit"}>{"Создать"}</Button>
        </form>
    );
};

export default CreateCard;
