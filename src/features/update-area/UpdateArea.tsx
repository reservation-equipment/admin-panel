import { useMutation, useQuery, useQueryClient } from "react-query";
import { baseUrl } from "@src/app/config/api.ts";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { Alert, AlertTypes } from "@src/shared/hooks/useAlert.tsx";
import Area from "@src/entities/area";

type UpdateAreaProps = {
  id: number | null;
  close: () => void;
  setAlert: Dispatch<SetStateAction<Alert>>;
};

const UpdateArea = ({ id, close, setAlert }: UpdateAreaProps) => {
  const queryClient = useQueryClient();

  const { data: oldData, isLoading: oldIsLoading } = useQuery({
    queryKey: ["areasUpdate"],
    queryFn: () => fetch(`${baseUrl}/area/${id}`).then((res) => res.json()),
  });

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: oldData?.data,
  });

  useEffect(() => {
    if (oldData) {
      Object.keys(oldData.data).forEach((key) => {
        setValue(key, oldData.data[key]);
      });
    }
  }, [oldData, setValue]);

  const { mutate } = useMutation(
    async (area: Area) => {
      const res = await fetch(`${baseUrl}/area`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(area),
      });
      return await res.json();
    },
    {
      onSuccess: () => {
        setAlert({
          type: AlertTypes.UPDATE_AREAS,
          msg: "Помещение успешно обновлено!",
          isOpen: true,
        });
        queryClient.invalidateQueries(["areas"]);
      },
    }
  );

  const handleUpdateArea = async (data: Area) => {
    data.square = Number(data.square);
    mutate(data);
    close();
  };

  if (oldIsLoading) return <p>Loading....</p>;
  return (
    <form
      onSubmit={handleSubmit(handleUpdateArea)}
      className={"w-full flex flex-col gap-6 mt-8"}
    >
      <TextField
        type={"text"}
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
        rows={5}
        label="Назначение"
        id={"CreateForm_appointment"}
        {...register("appointment")}
      />
      <Button variant={"contained"} className={"w-fit"} type={"submit"}>
        {"Обновить"}
      </Button>
    </form>
  );
};

export default UpdateArea;
