import { Button, InputLabel, TextField } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import DropzoneFiles from "../../shared/components/dropfiles/DropzoneFiles.tsx";
import { useUploadImages } from "@src/shared/hooks/useUploadImages.ts";
import { useGetAreas } from "@src/shared/hooks/useGetAreas.ts";
import { useCreateEquipment } from "@src/shared/hooks/useCreateEquipment.ts";
import { AlertTypes, useAlert } from "@src/shared/hooks/useAlert.tsx";
import { Equipment } from "@src/entities/equipment/Equipments.ts";
import { UICustomSelect } from "@src/shared/ui/form/custom-select/ui-custom-select.tsx";

const CreateCard = () => {
  const [setAlert, renderedAlert] = useAlert();

  const uploadFiles = useUploadImages();

  const { data, isLoading, isSuccess } = useGetAreas();
  const isSuccessData = isSuccess && !isLoading ? data : [];

  const { register, unregister, setValue, handleSubmit } = useForm();

  const mutation = useCreateEquipment();

  const handleCreateEquipment = async (
    dataForm: Equipment & {
      image_equipment: FileList[];
    }
  ) => {
    try {
      const { image_equipment, ...data } = dataForm;

      const resUploadingFiles = await uploadFiles(image_equipment);

      if (resUploadingFiles?.length === 0) {
        setAlert({
          type: AlertTypes.IDLE,
          msg: "Ошибка при загрузке файлов",
          isOpen: true,
        });
        return;
      } else if (resUploadingFiles?.length !== image_equipment?.length) {
        setAlert({
          type: AlertTypes.IDLE,
          msg: "Ошибка при загрузке файлов",
          isOpen: true,
        });
        return;
      } else {
        data.count = Number(data.count);
        data.area_id = Number(data.area_id);
        data.img_hrefs = resUploadingFiles;
        mutation.mutate(data);
        if (mutation.isSuccess && !mutation.isLoading) {
          setAlert({
            type: AlertTypes.CREATE_EQUIPMENT,
            msg: "Оборудование успешно создано!",
            isOpen: true,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) return <p>Loading....</p>;

  return (
    <>
      {renderedAlert}
      <form
        onSubmit={handleSubmit(
          handleCreateEquipment as SubmitHandler<FieldValues>
        )}
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
        <UICustomSelect
          regID={"area_id"}
          defaultValue={Number(data?.[0].id)}
          register={{ ...register("area_id") }}
          items={isSuccessData}
          labelId={"areas_select"}
          label={"Помещение"}
          id={"CreateForm_areas"}
        />
        <DropzoneFiles
          {...{
            name: "image_equipment",
            register,
            unregister,
            setValue,
          }}
        />
        <Button variant={"contained"} className={"w-fit"} type={"submit"}>
          {"Создать"}
        </Button>
      </form>
    </>
  );
};

export default CreateCard;
