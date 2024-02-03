import {Button, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useMemo} from "react";
import DropzoneFiles from "../../../../shared/components/dropfiles/DropzoneFiles.tsx";
import {useUploadImages} from "@src/hooks/useUploadImages.ts";
import {useGetAreas} from "@src/hooks/useGetAreas.ts";
import {Area} from "@src/shared/types/Area.ts";
import {useCreateEquipment} from "@src/hooks/useCreateEquipment.ts";
import {AlertTypes, useAlert} from "@src/hooks/useAlert.tsx";


const CreateCard = () => {
    const [ setAlert,
        renderedAlert] = useAlert()

    const uploadFiles = useUploadImages()

    const {data, isLoading} = useGetAreas()

    const {
        register,
        unregister,
        setValue,
        handleSubmit,
    } = useForm();

    const mutation = useCreateEquipment()

    const handleCreateEquipment = async (data: any) => {
        data.count = Number(data.count)
        data.area_id = Number(data.area_id)
        mutation.mutate(data);
        if (mutation.isSuccess || !mutation.isLoading) {
            setAlert({
                type: AlertTypes.CREATE_EQUIPMENT,
                msg: "Оборудование успешно создано!",
                isOpen: true
            })
            const newEquipment = await mutation.data;
            await uploadFiles(data.image_equipment, newEquipment.id++);
        }
    }

    const renderSelectItems = useMemo(() => {
        return data?.map((area: Area) => {
            return <MenuItem key={area.id} value={area.id}>{area.name}</MenuItem>
        })
    }, [data]);

    if (isLoading) return <p>Loading....</p>

    return (
        <>
            {renderedAlert}
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
                    rows={4}
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
                    defaultValue={Number(data?.[0].id)}
                    {...register("area_id")}
                    labelId={"areas_select"}
                    label={"Помещение"}
                    id={"CreateForm_areas"}>
                    {renderSelectItems}
                </Select>
                <DropzoneFiles {...{
                    name: "image_equipment",
                    register,
                    unregister,
                    setValue,
                }}/>
                <Button variant={"contained"} className={"w-fit"} type={"submit"}>{"Создать"}</Button>
            </form>
        </>
    );
};

export default CreateCard;
