import {useMutation, useQueryClient} from "react-query";
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModes,
    GridRowModesModel,
    GridToolbarContainer,
} from '@mui/x-data-grid';
import {baseUrl} from "@src/config/api.ts";
import {useState} from "react";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {randomId} from "@mui/x-data-grid-generator";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useGetAreas} from "@src/hooks/useGetAreas.ts";

interface EditToolbarProps {
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}

function EditToolbar(props: EditToolbarProps) {
    const {  setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();

        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

const AreasTable = ({openPopup}: any) => {
    const queryClient = useQueryClient();
    const [rowModesModel, setRowModesModel] = useState<any>({});

    const deleteArea = useMutation((id: number) => {
        return fetch(`${baseUrl}/area/${id}`, {
            method: "delete",
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries(['areas'])
    });

    const {data, isLoading} = useGetAreas()

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        openPopup(id as number)
    }
    const handleDeleteClick = (id: GridRowId) => () => {
        deleteArea.mutate(id as number)
        // setRows(rows.filter((row) => row.id !== id));
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Название', width: 200 },
        { field: 'square', headerName: 'Площадь', type: "number", width: 190 },
        {
            field: 'appointment',
            headerName: 'Назначение',
            width: 650,
        },
        {
            field: 'institute',
            headerName: 'Институт',
            width: 650,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({id}) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];

            },
        }
    ];

    if (isLoading) return <p>is loading...</p>

    return (
            <DataGrid
                style={{
                    width: "fit-content",
                    height: "fit-content",
                    marginTop: 40,
                }}
                editMode="row"
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 5},
                    },
                }}
                pageSizeOptions={[5, 10, 15, 30]}

                checkboxSelection
                rowModesModel={rowModesModel}
                onRowEditStop={handleRowEditStop}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRowModesModel },
                }}
            />
    );
}

export default AreasTable