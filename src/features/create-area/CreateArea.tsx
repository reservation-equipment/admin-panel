import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { baseUrl } from "@src/app/config/api.ts";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useMemo } from "react";
import { InstitutesModel } from "@src/entities/department/department.ts";
import { useInstitutes } from "@src/shared/hooks/useInstitutes.ts";
import { Area } from "@src/entities/area";

const CreateArea = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useInstitutes();

  const { register, handleSubmit, reset } = useForm<Area>();

  const mutation = useMutation(
    (area: Area) => {
      return fetch(`${baseUrl}/area`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(area),
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["areas"]),
    }
  );

  const handleCreateArea = (data: Area) => {
    data.square = Number(data.square);
    mutation.mutate(data);
    reset();
  };

  const renderSelectItems = useMemo(() => {
    return data?.map((institute: InstitutesModel) => {
      return (
        <MenuItem key={institute.id} value={institute.id}>
          {institute.name}
        </MenuItem>
      );
    });
  }, [data]);

  if (isLoading) return <p>IS LOADING</p>;

  return (
    <form
      onSubmit={handleSubmit(handleCreateArea)}
      className={"w-1/4 flex flex-col gap-6 mt-8"}
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
        label="Назначение"
        id={"CreateForm_appointment"}
        {...register("appointment")}
      />
      <InputLabel id="institutes_select">Институт</InputLabel>
      <Select
        defaultValue={data?.[0]?.id}
        {...register("institutes_id")}
        labelId={"institutes_select"}
        label={"Институт"}
        id={"CreateForm_institutes"}
      >
        {renderSelectItems}
      </Select>
      <Button variant={"contained"} className={"w-fit"} type={"submit"}>
        {"Создать"}
      </Button>
    </form>
  );
};

export default CreateArea;
