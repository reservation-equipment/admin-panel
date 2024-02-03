import AreasTable from "./components/AreasTable/AreasTable.tsx";
import CreateArea from "./components/CreateArea/CreateArea.tsx";
import {useState} from "react";
import {Box, Modal} from "@mui/material";
import UpdateArea from "./components/UpdateArea/UpdateArea.tsx";
import {useAlert} from "@src/hooks/useAlert.tsx";


const Areas = () => {
    const [
        setAlert,
        renderedAlert] = useAlert()
    const [openUpdatePopup, setOpenUpdatePopup] = useState(false)
    const [idSelected, setIdSelected] = useState<number | null>(null)
    const handleClose = () => setOpenUpdatePopup(false);

    const handleOpen = (id: number) => {
        setIdSelected(id)
        setOpenUpdatePopup(true)
    }

    return (
        <>
            <Modal
                open={openUpdatePopup}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 600,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    color: "black"
                }}>
                    <UpdateArea id={idSelected} close={handleClose} setShowAlert={setAlert}/>
                </Box>
            </Modal>
            <CreateArea/>
            <AreasTable openPopup={handleOpen}/>
            {renderedAlert}

        </>
    );
};

export default Areas;
