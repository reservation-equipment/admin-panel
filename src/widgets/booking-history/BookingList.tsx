import { TBooking } from "@src/entities/booking/booking.ts";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useMemo } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

interface BookingList {
  data: TBooking[];
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "equipment_name",
    headerName: "Название оборудования",
    width: 150,
    editable: false,
  },
  {
    field: "first_name",
    headerName: "Имя пользователя",
    width: 150,
    editable: false,
  },
  {
    field: "second_name",
    headerName: "Фамилия пользователя",
    width: 200,
    editable: false,
  },
  {
    field: "date_from",
    headerName: "Дата начала брони",
    sortable: false,
    width: 160,
    type: "dateTime",
    valueGetter: (params: GridValueGetterParams) =>
      new Date(params.row.date_from),
  },
  {
    field: "date_to",
    headerName: "Дата конца брони",
    sortable: false,
    width: 160,
    type: "dateTime",
    valueGetter: (params: GridValueGetterParams) =>
      new Date(params.row.date_to),
  },
  {
    field: "status",
    headerName: "Статус брони",
    sortable: true,
    width: 160,
    type: "boolean",
    valueGetter: (params: GridValueGetterParams) =>
      params.row.status === "BOOKED",
  },
];

const BookingList = ({ data }: BookingList) => {
  const new_data = useMemo(
    () =>
      data.map((item: TBooking) => {
        const {
          equipments: { status, name },
          users: { first_name, second_name },
          date_from,
          date_to,
          id,
        } = item;
        return {
          status,
          date_from,
          date_to,
          id,
          first_name,
          second_name,
          equipment_name: name,
        };
      }),
    [data]
  );

  return (
    <DataGrid
      columns={columns}
      rows={new_data}
      slots={{
        toolbar: () => <GridToolbar />,
        booleanCellTrueIcon: () => <EventAvailableIcon color={"success"} />,
        booleanCellFalseIcon: () => <AccessTimeIcon color={"warning"} />,
      }}
      // onFilterModelChange={(props: any) => console.log("filter", props)}
    />
  );
};

export default BookingList;
