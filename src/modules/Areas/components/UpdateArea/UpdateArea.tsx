import {useMutation, useQuery, useQueryClient} from "react-query";
import {baseUrl} from "../../../../config/api.ts";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {Button, TextField} from "@mui/material";

type UpdateAreaProps = {
    id: number | null
    close: () => void
}


const UpdateArea = ({id, close}: UpdateAreaProps) => {
    const queryClient = useQueryClient();

    const {data: oldData, isLoading: oldIsLoading} = useQuery({
        queryKey: ["areasUpdate"],
        queryFn: () => fetch(`${baseUrl}/area/${id}`).then(res => res.json()),
    })
    // console.log(oldData?.data)

    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: oldData?.data
    });

    useEffect(() => {
        console.log(oldData?.data)
        reset(oldData);
    }, [oldData, reset]);

    const {mutate} = useMutation(
        async area => {
            const res = await fetch(`${baseUrl}/area`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(area)
            });
            return await res.json();
        }, {
            onSuccess: () => queryClient.invalidateQueries(['areas'])
        })

    const handleUpdateEquipment = async (data: any) => {
        data.square = Number(data.square)
        mutate(data)
        close()
    }

    if (oldIsLoading) return <p>Loading....</p>
    return (
        <form onSubmit={handleSubmit(handleUpdateEquipment)} className={"w-full flex flex-col gap-6 mt-8"}>
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
            <Button variant={"contained"} className={"w-fit"} type={"submit"}>{"Обновить"}</Button>
        </form>
    );
};

export default UpdateArea;
