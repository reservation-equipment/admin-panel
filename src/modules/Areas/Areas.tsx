import AreasTable from "./components/AreasTable/AreasTable.tsx";
import CreateArea from "./components/CreateArea/CreateArea.tsx";
import {useEffect, useState} from "react";
import {Alert, Box, Fade, Modal} from "@mui/material";
import UpdateArea from "./components/UpdateArea/UpdateArea.tsx";

const TIMER_FADE_ALERT = 3000


const Areas = () => {
    const [showAlert, setShowAlert] = useState(false)
    const [openUpdatePopup, setOpenUpdatePopup] = useState(false)
    const [idSelected, setIdSelected] = useState<number | null>(null)
    const handleClose = () => setOpenUpdatePopup(false);

    const handleOpen = (id: number) => {
        setIdSelected(id)
        setOpenUpdatePopup(true)
    }

    useEffect(() => {

            const timeout = setTimeout(() => {
                setShowAlert(false);
            }, TIMER_FADE_ALERT);

            return () => {
                clearTimeout(timeout);
            }

    }, [showAlert])


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
                    <UpdateArea id={idSelected} close={handleClose} setShowAlert={setShowAlert}/>
                </Box>
            </Modal>
            <CreateArea/>
            <AreasTable openPopup={handleOpen}/>
            {showAlert && <Fade in={showAlert}>
                <Alert variant={"filled"} style={{
                    width: 400,
                    position: 'absolute',
                    right: 50,
                    top: 50
                }} severity="success">
                    Помещение успешно обновлено
                </Alert>
            </Fade>}
        </>
    );
};

export default Areas;
