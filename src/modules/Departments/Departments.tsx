import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box} from "@mui/material";
import {useQuery} from "react-query";
import {getAllInfo} from "../../api/Departments.ts";

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'institute',
        headerName: 'Institutes',
        width: 550,
        editable: true,
    },
    {
        field: 'area',
        headerName: 'Area',
        width: 300,
        editable: true,
    },
    {
        field: 'equipment',
        headerName: 'Equipment',
        type: 'number',
        width: 290,
        editable: true,
        align: "left",
        headerAlign: "left",
    },
];



const Departments = () => {
    const {data: rows, isLoading} = useQuery({
        queryKey: ["infoTables"],
        queryFn: getAllInfo
    })
    if(isLoading)return <p>is loading</p>
    return (
        <Box sx={{
            height: "auto",
            width: "fit-content"
        }}>
            <DataGrid
                rows={rows.data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 30,
                        },
                    },
                }}
                pageSizeOptions={[10, 15, 20, 30]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default Departments;
