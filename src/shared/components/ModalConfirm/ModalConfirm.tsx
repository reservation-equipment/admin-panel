import {Button} from "@mui/material";

const ModalConfirm = (props: any) => {
    const {msg, actionFunc, handleClose} = props;

    const handleCancel = () => {
        actionFunc()
        handleClose()
    }
    return (
        <div>
            <p>{msg}</p>
            <Button onClick={handleClose}>{"Отмена"}</Button>
            <Button onClick={handleCancel}>{"Подтвердить"}</Button>
        </div>
    );
};

export default ModalConfirm;
