import { MenuItem, Select } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";
import { Area } from "@src/entities/area/Area.ts";
import { useMemo } from "react";

export function UICustomSelect<regID extends string>({
  register,
  defaultValue,
  regID,
  labelId,
  items,
  label,
  id,
}: {
  regID?: string;
  defaultValue: number;
  register: UseFormRegisterReturn<regID>;
  items: Area[];
  labelId: string;
  label: string;
  id: string;
}) {
  const renderSelectItems = useMemo(() => {
    return items?.map((area: Area) => {
      return (
        <MenuItem key={area.id} value={area.id}>
          {area.name}
        </MenuItem>
      );
    });
  }, [items]);

  return (
    <Select
      defaultValue={defaultValue}
      {...register}
      labelId={labelId}
      label={label}
      id={id}
    >
      {renderSelectItems}
    </Select>
  );
}
