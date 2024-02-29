import { Button } from "@mui/material";

type ModalConfirm = {
  actionFunc: () => void;
  handleClose: () => void;
  msg: string;
};

const ModalConfirm = ({
                          msg,
                          actionFunc,
                          handleClose
                      }: ModalConfirm) => {

    const handleCancel = () => {
        if(actionFunc) {
            actionFunc()
        }
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
