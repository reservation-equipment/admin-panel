import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { Area } from "@src/entities/area/Area.ts";
import { useGetAreas } from "@src/shared/hooks/useGetAreas.ts";
import { Alert, AlertTypes } from "@src/shared/hooks/useAlert.tsx";
import { baseUrl } from "@src/app/config/api.ts";

type UpdateCardProps = {
  id: number | null;
  close: () => void;
  setAlert: Dispatch<SetStateAction<Alert>>;
};

const UpdateCard = ({ id, close, setAlert }: UpdateCardProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isSuccess } = useGetAreas();

  const { data: oldData, isLoading: oldIsLoading } = useQuery({
    queryKey: ["equipmentsUpdate"],
    queryFn: () =>
      fetch(`${baseUrl}/equipment/${id}`).then((res) => res.json()),
  });

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: oldData,
  });

  useEffect(() => {
    reset(oldData);
  }, [oldData]);

  const { mutate } = useMutation(
    async (equipment) => {
      const res = await fetch(`${baseUrl}/equipment`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipment),
      });
      return await res.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["equipments"]);
        setAlert({
          type: AlertTypes.UPDATE_EQUIPMENT,
          msg: "Оборудование успешно обновлено!",
          isOpen: true,
        });
      },
    }
  );

  const handleUpdateEquipment = async (data: any) => {
    data.count = Number(data.count);
    mutate(data);
    close();
  };

  const renderSelectItems = useMemo(() => {
    if (data && !isLoading && isSuccess) {
      return data?.map((area: Area) => {
        return (
          <MenuItem key={area.id} value={area.id}>
            {area.name}
          </MenuItem>
        );
      });
    }
  }, [data, isLoading, isSuccess]);

  if (isLoading || oldIsLoading) return <p>Loading....</p>;
  return (
    <form
      onSubmit={handleSubmit(handleUpdateEquipment)}
      style={{
        minWidth: 600,
      }}
      className={"flex flex-col gap-6 mt-8"}
    >
      <TextField
        type={"text"}
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
      <FormControl fullWidth>
        <InputLabel id="CreateForm_areas">Помещение</InputLabel>
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              labelId={"areas_select"}
              label={"Помещение"}
              id={"CreateForm_areas"}
            >
              {renderSelectItems}
            </Select>
          )}
          name={"area_id"}
          control={control}
          defaultValue={oldData.area_id}
        />
      </FormControl>
      <Button variant={"contained"} className={"w-fit"} type={"submit"}>
        {"Обновить"}
      </Button>
    </form>
  );
};

export default UpdateCard;
