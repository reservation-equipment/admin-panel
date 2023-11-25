import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Box} from "@mui/material";
import {useQuery} from "react-query";
import {getAllInfo} from "../../config/routes/Departments.ts";

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
        width: 150,
        editable: true,
    },
    {
        field: 'equipment',
        headerName: 'Equipment',
        type: 'number',
        width: 110,
        editable: true,
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];

// const rows = [
//     {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35},
//     {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
//     {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
//     {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
//     {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
//     {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
//     {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
//     {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
//     {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
// ];

const Departments = () => {
    const {data: rows, isLoading} = useQuery({
        queryKey: ["infoTables"],
        queryFn: getAllInfo
    })
    console.log(rows)
    if(isLoading)return <p>is loading</p>
    return (
        <Box sx={{
            height: "auto",
            width: "50%"
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
                pageSizeOptions={[30]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default Departments;
