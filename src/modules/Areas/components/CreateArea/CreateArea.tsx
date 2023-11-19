import {useMutation, useQueryClient} from "react-query";
import {useForm} from "react-hook-form";
import {baseUrl} from "../../../../config/api.ts";
import {Button, TextField} from "@mui/material";

const CreateArea = () => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const mutation = useMutation(area => {
        return fetch(`${baseUrl}/area`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(area)
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries(['areas'])
    })

    const handleCreateArea = (data: any) => {
        console.log(data)
        data.square = Number(data.square)
        mutation.mutate(data)
        reset()
    }


    return (
        <form onSubmit={handleSubmit(handleCreateArea)} className={"w-1/4 flex flex-col gap-6 mt-8"}>
            <TextField type={"text"}
                       label="Название"
                       id={"CreateForm_name"}
                       fullWidth
                       {...register("name")}
            />
            <TextField
                className={"w-fit"}
                label="Площадь (в м^2)"
                type={"number"}
                id={"CreateForm_square"}
                {...register("square")}
            />
            <TextField
                type={"text"}
                multiline={true}
                label="Назначение"
                id={"CreateForm_appointment"}
                {...register("appointment")}
            />
            <Button variant={"contained"} className={"w-fit"} type={"submit"}>{"Создать"}</Button>
        </form>
    );
};

export default CreateArea;
