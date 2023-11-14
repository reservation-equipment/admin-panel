import {Button, Select, TextField} from "@mui/material";
import {Form, useForm} from "react-hook-form";

const CreateCard = () => {
    const {
        register,
        handleSubmit,
    } = useForm();
    const handleCreateEquipment = (data: any) => {
        console.log(data)
    }
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
            <Select/>
            <Button variant={"contained"} className={"w-fit"} type={"submit"}>Создать</Button>
        </form>
    );
};

export default CreateCard;
