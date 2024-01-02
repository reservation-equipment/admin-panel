import {Box, Modal} from "@mui/material";

const ModalWrapper = (props: any) => {
    const {handleClose, open, children} = props
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: "fit-content",
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                color: "black"
            }}>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalWrapper;
